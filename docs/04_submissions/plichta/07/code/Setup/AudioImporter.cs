using System.Collections.Generic;
using System;
using UnityEngine;
using Unity.VisualScripting;

namespace com.artbymarek.dirmic
{
    public enum InstrumentName
    {
        voiceopening, kitchenperc, ragerkit, reesebasic, voicerevA, voicerevApan, reesebasicHigh,
    }
    /// <summary>
    /// Imports all sounds from disk and stores them in Dictionaries. The file names are used to pass on coordinates to classes.
    /// </summary>
    public class AudioImporter : MonoBehaviour
    {
        // Dictionaries to store cubes by attributes
        // We have multiple cubes that share the same attribute (like a timestamp, height, or layer). We can store all of them in a list and associate that list with the shared attribute in our dictionary.
        // So int 1 (key) has perhaps 3 cubes that we store a list
        private Dictionary<int, List<GameObject>> _cubesByTimestamp = new Dictionary<int, List<GameObject>>();
        private Dictionary<int, List<GameObject>> _cubesByTrack = new Dictionary<int, List<GameObject>>();
        private Dictionary<int, List<GameObject>> _cubesByLayer = new Dictionary<int, List<GameObject>>();
        private Dictionary<InstrumentName, List<GameObject>> _cubesByInstrumentName = new Dictionary<InstrumentName, List<GameObject>>();

        public int CountTimestamps;
        // public List<AudioSource> _audioSourcesToSync = new List<AudioSource>();

        public List<SoundShape> _allSoundShapes = new List<SoundShape>();
        public List<GameObject> _allCubes = new List<GameObject>();

        void Start()
        {
            // Load all audio clips from the Resources/work folder
            AudioClip[] audioClips = Resources.LoadAll<AudioClip>("work");
            Debug.Log("audioimporter starts");

            // Material material = Resources.Load<Material>("PlainMat");
            foreach (AudioClip audioClip in audioClips)
            {

                // Parse the timestamp, height, and Z value as integers
                // I exported all sounds with a specific naming convention like "x0010 Y1 Z0_voiceopening"
                // first lets split the name into 4 parts by using an space as divider
                string[] parts = audioClip.name.Split(' ');
                //now lets get the string of the first part and start from the second character and transform it into an int
                int timestamp = int.Parse(parts[0].Substring(1)); // Remove the 'X' prefix
                int track = int.Parse(parts[1].Substring(1)); // Remove the 'Y' prefix
                int layer = int.Parse(parts[2].Substring(1)); // Remove the 'Z' prefix
                                                              //these will used to place in 3d space. X,Y,Z. X = timestamp, Y= track group in ableton, Z the single notes that make one beat sound good, but which I fragmented for this space
                                                              // Debug.Log("audioimporter timestamp " + timestamp);

                //Additionally we parse the Insrument  name as an enum so we can more quickly access tracks how they are showing in Ableton. Could be done also without but why not.
                InstrumentName instrument;
                if (!Enum.TryParse(parts[3], out instrument))
                {
                    Debug.LogError("Invalid group name: " + parts[3]);
                    continue;
                }

                // Create a new cube
                GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
                // cube.GetComponent<Renderer>().material = material;
                cube.transform.SetParent(this.transform); //add to unity parent this script is attached to
                //Assign Unity collision layer
                int layerIndex = LayerMask.NameToLayer("Sounds");
                if (layerIndex == -1) //layer not found
                {
                    Debug.LogError("Layer 'Sounds' does not exist");
                }
                else
                {
                    cube.layer = layerIndex;
                }

                // Setup Audiclip 
                //Add component and assign it to the referece
                AudioSource audioSource = cube.AddComponent<AudioSource>();
                // _audioSourcesToSync.Add(audioSource);
                audioSource.clip = audioClip;
                audioSource.spatialBlend = 1.0f; // 1.0 for 3D sound, 0.0 for 2D sound
                audioSource.minDistance = 0f; // Set the maximum distance
                audioSource.maxDistance = 3.0f; // Set the maximum di stance
                audioSource.rolloffMode = AudioRolloffMode.Linear;
                audioSource.loop = true;
                audioSource.volume = 0f;
                audioSource.playOnAwake = true;
                _allCubes.Add(cube);

                //TODO when printing this it shows that files are not loaded despite the function reaching the end. see debug below
                // Check if the audio clip is fully loaded
                // if (audioSource.clip.loadState == AudioDataLoadState.Loaded)
                // {
                //     Debug.Log("Audio audioSource.clip is fully loaded.");
                //     // You can safely play the audio audioSource.clip here
                //     audioSource.Play();
                // }
                // else
                // {
                //     Debug.Log("Audio audioSource.clip is not fully loaded.");
                //     // Handle the case where the audio audioSource.clip is not fully loaded
                // }

                // Setup class that controls the sound of the cube
                SoundShape soundShape = cube.AddComponent<SoundShape>();
                soundShape.Initiate(timestamp, track, layer, instrument, audioSource);
                _allSoundShapes.Add(soundShape);

                // soundShape.TogglePlayingSound(true);

                // Add the cube to the dictionaries
                AddCubeToDictionary(_cubesByTimestamp, timestamp, cube);
                AddCubeToDictionary(_cubesByTrack, track, cube);
                AddCubeToDictionary(_cubesByLayer, layer, cube);
                AddCubeToDictionary(_cubesByInstrumentName, instrument, cube);


                // Debug.Log("Audio Import Done");
                //so PlaceCubes knows it can start
                // AudioLoaded = true;
                GLOBAL.G.AllAudioImported = true;
            }
            CountTimestamps = _cubesByTimestamp.Count;

            GLOBAL.G.stopwatch.Start();
            // TODO I could try to run a check if the audioscourses are ready to be played: audiosources.readytoplay an donly then play them at one and start stopwatch. 
            // double startTime = AudioSettings.dspTime + 2; // Start 1 second from now
            // foreach (AudioSource audioSource in _audioSourcesToSync)
            // {
            //     audioSource.PlayScheduled(startTime);
            // }
            // Start all audio sources
            // foreach (AudioClip audioClip in audioClips)
            // {
            //     audioClip.Play();
            // }
            // Start the stopwatch



        }
        private void AddCubeToDictionary(Dictionary<int, List<GameObject>> dictionary, int key, GameObject cube)
        {
            if (!dictionary.TryGetValue(key, out List<GameObject> cubes))
            {
                cubes = new List<GameObject>();
                dictionary[key] = cubes;
            }
            cubes.Add(cube);
        }
        private void AddCubeToDictionary(Dictionary<InstrumentName, List<GameObject>> dictionary, InstrumentName key, GameObject cube)
        {
            if (!dictionary.TryGetValue(key, out List<GameObject> cubes))
            {
                cubes = new List<GameObject>();
                dictionary[key] = cubes;
            }
            cubes.Add(cube);
        }

        // Methods to get cubes by attributes
        public List<GameObject> GetCubesByTimestamp(int timestamp)
        {
            return _cubesByTimestamp.TryGetValue(timestamp, out List<GameObject> cubes) ? cubes : null;
        }

        public List<GameObject> GetCubesByHeight(int track)
        {
            return _cubesByTrack.TryGetValue(track, out List<GameObject> cubes) ? cubes : null;
        }

        public List<GameObject> GetCubesByLayer(int layer)
        {
            return _cubesByLayer.TryGetValue(layer, out List<GameObject> cubes) ? cubes : null;
        }

        public List<GameObject> GetCubesByInstrumentName(InstrumentName instrument)
        {
            return _cubesByInstrumentName.TryGetValue(instrument, out List<GameObject> cubes) ? cubes : null;
        }


    }
}