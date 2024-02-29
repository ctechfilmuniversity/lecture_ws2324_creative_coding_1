using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

namespace com.artbymarek.dirmic
{
    /// <summary>
    /// This class was meant to call all audio sources. But we also have a class for individual tracks
    /// </summary>
    public class AudioFiles : MonoBehaviour
    {
        // private float _lastdiameter;
        // private List<GameObject> _soundObjects;
        private GameObject[] _soundObjects;
        private AudioSource[] _audioSources;
        private Collider[] _colliders;
        public GameObject[] SoundObjects
        {
            get { return _soundObjects; }
            set { _soundObjects = value; }
        }

        public AudioSource[] AudioSources
        {
            get { return _audioSources; }
            set { _audioSources = value; }
        }

        public Collider[] Colliders
        {
            get { return _colliders; }
            set { _colliders = value; }
        }

        private void Awake()
        {
            _soundObjects = new GameObject[transform.childCount];
            _audioSources = new AudioSource[transform.childCount];
            _colliders = new Collider[transform.childCount];

            for (int i = 0; i < _soundObjects.Length; i++)
            {
                _soundObjects[i] = transform.GetChild(i).gameObject;

                _audioSources[i] = _soundObjects[i].GetComponent<AudioSource>();
                _colliders[i] = _soundObjects[i].GetComponent<Collider>();

                if (_audioSources[i] == null || _colliders[i] == null)
                {
                    Debug.Log("Only GameObject with AudioSoruces and Colliders  are allowed on this `Folder`?" + _audioSources[i] + _colliders[i]);
                }
            }
        }

        private void Start()
        {


            // for (int i = 0; i < length; i++)
            // {

            // }

        }

        void Update()
        {
            if (GLOBAL.G.ScaleAudioWithModelIsDone)
            {
                ChangeVolume();
            }
        }

        // public void Collided()
        // {
        //     Debug.Log("Audiofile collided true");
        //     this.gameObject.GetComponent<Renderer>().material.color = new Color(1f, 0f, 0f);

        // }

        //! These functions are not needed anymore, since I  don't change the audiofiles volume/size anymore. Or perhaps for the scale of the prefab still?
        public void ChangeVolume()
        {
            //float diameter = TouchInput.AbsoluteDrag.y;
            float scaleFactor = GLOBAL.G.dragFactor.y; //scaleFactor gets its value from Touchinput
            // Debug.Log("scaleFactor:" + scaleFactor); //should be between 0.05 and 0.5?

            // Debug.Log("diameter:" + scaleFactor);
            var audioSources = GetComponentsInChildren<AudioSource>(); //TODO make audiosources a field?

            float newVolume = AdjustVolume(scaleFactor);
            float newAudioCollidorSize = AdjustAudioCollidor(scaleFactor);
            // float newSphereSize = adjustToScale(circleRadius);
            //am einfachsten ist es wenn ich alles auf maximum setze und der spieler dann kleiner skalieren muss?
            //radius 3, volume 0.1? max distance 0.05?

            foreach (var audioSource in audioSources)
            {
                //TODO don't scale wind!
                //Debug.Log("audioSource.maxDistance:" + audioSource.maxDistance);
                audioSource.maxDistance = newAudioCollidorSize;
                audioSource.volume = newVolume;
            }
        }

        private float AdjustVolume(float sizeCollidor)
        {
            float adjustedValue;
            //the smaller the mic size the bigger the audio volume 
            float inMin = GLOBAL.G.sizeMicMax;
            float inMax = GLOBAL.G.sizeMicMin;
            float outMin = GLOBAL.G.volumeMin;
            float outMax = GLOBAL.G.volumeMax;
            // map circleRadius (inMin-to-inMax) to audioVolume (outMin-to-outMax)
            adjustedValue = (sizeCollidor - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
            return adjustedValue;
        }

        private float AdjustAudioCollidor(float circleRadius)
        {
            //TODO circleRadius is perhaps not within inmax range?!
            float adjustedValue;
            // define the input range
            float inMin = GLOBAL.G.sizeMicMin;  //min and max swoapped because we want size to go up when volumen goes down
            float inMax = GLOBAL.G.sizeMicMax;
            // define the output range
            float outMin = GLOBAL.G.audioCollidorSizeMin;
            float outMax = GLOBAL.G.audioCollidorsizeMax;
            // map circleRadius (inMin-to-inMax) to audioVolume (outMin-to-outMax)
            adjustedValue = (circleRadius - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
            return adjustedValue;
        }
    }
}