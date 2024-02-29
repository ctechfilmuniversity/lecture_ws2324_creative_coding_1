using UnityEngine;

namespace com.artbymarek.dirmic
{
    /// <summary>
    /// Soundshape is used to control states of the sound and its' parent gameobject. 
    /// </summary>
    public class SoundShape : MonoBehaviour
    {
        private AudioSource _audioSource;
        private Playhead _playhead;
        private bool _markedByScanner;
        private int _timestamp;
        public int Timestamp => _timestamp;
        private int _track;
        public int Track => _track;
        private int _layer;
        public int Layer => _layer;
        private InstrumentName _instrument;
        public InstrumentName Instrument => _instrument;
        private bool _isActive = false;
        // public bool ClipReachedEnd;
        private bool _linedUpForMuting;
        private bool _loopDone; //not used yet
        public bool LoopDone
        {
            get => _loopDone;
            set => _loopDone = value;
        }


        private void Awake()
        {
            //we need the reference so we can tell playhead to remove soundshape instances from the list
            _playhead = this.gameObject.GetComponentInParent<Playhead>();
            if (_playhead == null)
            {
                UnityEngine.Debug.Log("_playhead is null. Maybe it wa snot initiated before Soundshape?");
            }
        }
        public void Initiate(int timestamp, int track, int layer, InstrumentName instrument, AudioSource audioSource)
        {
            _timestamp = timestamp;
            _track = track;
            _layer = layer;
            _instrument = instrument;
            _audioSource = audioSource;
            _audioSource.Play();
        }

        private void Update()
        {
            if (GLOBAL.G.AllAudioImported) //make sure all audios are imported before we start accessing them here
            {
                //if an object is hit by a raycast, it is marked true every frame
                //object is not marked by scanner (anymore).
                if (_markedByScanner == false) //Object not scanned //TODO swap marked byscanner = true for better readability
                {
                    //if it was activated before, then turn it off now. Don't do anything if it was inactive anyway
                    if (_isActive)
                    {
                        _isActive = false;
                        GreyOutObject();
                        // Debug.Log("marked scanner FALSE and was ACTIVE before for TS " + _timestamp);
                        _playhead.Remove(this);
                        //mute but not right now. Mute after the loop is done playing
                        _linedUpForMuting = true;

                    }
                }
                else
                { //if object is marked by scanner
                    //and it wasn't already active, activate it now. do nothing if it is active already
                    if (!_isActive)
                    {
                        _isActive = true;
                        HighlightObject();
                        _playhead.Add(this);
                        _linedUpForMuting = false; //not sure this is needed
                    }
                    _markedByScanner = false;
                }
            }
            if (IsMuted() == false) RotateObject(); //spin if playing
            if (_linedUpForMuting && _loopDone) Mute(); //This is not needed anymore because I mute everything now, but might get useful for other features

        }

        public void Mute()
        {
            TurnOffVolume();
            _linedUpForMuting = false;
            // UnityEngine.Debug.Log("sounshape been MUTED");
        }
        public void Unmute()
        {
            TurnOnVolume();
        }
        public bool IsMuted()
        {
            // returns true if the volume is 0. 
            // we don't just stop the audio because it would get out of sync
            return _audioSource.volume == 0;
        }
        private void GreyOutObject()
        {
            this.gameObject.GetComponent<Renderer>().material.color = new Color(1f, 1f, 1f);
        }

        private void HighlightObject()
        {
            this.gameObject.GetComponent<Renderer>().material.color = new Color(1f, 0f, 0f);
        }

        private void TurnOnVolume()
        {
            _audioSource.volume = 1f;
        }

        private void TurnOffVolume()
        {
            _audioSource.volume = 0f;
        }

        public void MarkedByScanner()
        {
            _markedByScanner = true;
        }

        private void RotateObject()
        {
            float rotationSpeed = 360f * 1.5f; // Degrees per second
            float rotationAmount = rotationSpeed * Time.deltaTime;
            this.transform.Rotate(rotationAmount / 2, rotationAmount, 0f + rotationAmount / 3);
        }
        public float RemainingTime()
        {
            return _audioSource.clip.length - _audioSource.time;
        }
    }
}