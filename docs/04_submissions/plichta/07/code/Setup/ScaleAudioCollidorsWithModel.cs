using System.Collections;
using System.Collections.Generic;
using UnityEngine;
namespace com.artbymarek.dirmic
{
    public class ScaleAudioCollidorsWithModel : MonoBehaviour
    {
        [TextArea] public string Notes;
        // Start is called before the first frame update
        [SerializeField] private float originalScale = 1.0f; // Set this to the prefab's original scale


        void Start()
        {

            //float currentWorldScale = this.GetComponentInParent<GameObject>().transform.localScale.x; 
            float currentScaleFactor = GLOBAL.G.scaleFactorModel / originalScale;
            // Debug.Log("currentScaleFactor" + currentScaleFactor);
            var audioSources = GetComponentsInChildren<AudioSource>();


            SetDefaultAudioValues(audioSources, currentScaleFactor);
        }

        private static void SetDefaultAudioValues(AudioSource[] audioSources, float currentScaleFactor)
        {
            //Set all audio sources at start to low and circle to big
            foreach (var audioSource in audioSources)
            {
                if (!audioSource.name.StartsWith("wind"))
                {
                    audioSource.volume = 0.01f; //wind should be half es loud as other sounds
                    audioSource.maxDistance *= currentScaleFactor; //= should be 0.01
                }
                else
                {
                    audioSource.maxDistance *= currentScaleFactor * 9f; //= should be 0.01
                    // Debug.Log("audioSource.maxDistance at setup:" + audioSource.maxDistance);

                    //audioSource.maxDistance *= currentScaleFactor; //= should be 0.01
                    audioSource.volume = 0.005f;
                }
            }

            GLOBAL.G.ScaleAudioWithModelIsDone = true;
            //Debug.Log("scaleaudio is done:");

        }
    }
}