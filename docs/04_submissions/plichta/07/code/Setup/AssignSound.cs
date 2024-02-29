using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using Random = UnityEngine.Random;

namespace com.artbymarek.dirmic
{

    /// <summary>
    /// Assigns random sound file from Resources folder to attached GB
    /// </summary>
    public class AssignSound : MonoBehaviour //!not used anymore
    {
        // Start is called before the first frame update
        public AudioClip[] sounds; // Array für die Soundclips
        private AudioSource audioSource; // AudioSource-Komponente

        void Start()
        {

            // AudioSource-Komponente hinzufügen, falls nicht vorhanden
            audioSource = gameObject.GetComponent<AudioSource>();
            if (audioSource == null)
            {
                audioSource = gameObject.AddComponent<AudioSource>();
            }
            // Zufälligen Sound auswählen und vorbereiten
            GetRandomSoundclip();
        }


        // Public Method zum Starten/Stoppen der Wiedergabe
        public void ToggleSound(bool play)
        {
            if (play && !audioSource.isPlaying)
            {
                audioSource.Play();
            }
            else if (!play && audioSource.isPlaying)
            {
                audioSource.Stop();
            }
        }

        // Funktion zum Abspielen eines zufälligen Sounds
        private void GetRandomSoundclip()
        {
            sounds = Resources.LoadAll<AudioClip>("Sounds");
            Debug.Log("Number of audio clips loaded: " + sounds.Length);

            if (sounds.Length > 0)
            {
                int randomIndex = Random.Range(0, sounds.Length);
                audioSource.clip = sounds[randomIndex];
                audioSource.Play();
                Debug.Log("random clip");
            }
        }

        private void Update()
        {
            //ToggleSound(true);
        }
    }
}