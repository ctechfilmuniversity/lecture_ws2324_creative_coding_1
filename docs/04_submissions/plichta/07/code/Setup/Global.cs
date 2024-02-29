using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Diagnostics;


namespace com.artbymarek.dirmic
{
    /// <summary>
    /// Helper class to pass some values around easier and have one place to control some value settings
    /// </summary>
    public class GLOBAL : MonoBehaviour
    {
        public static GLOBAL G { get; private set; }
        public Stopwatch stopwatch = new Stopwatch();
        public bool AllAudioImported;
        public float scaleFactorModel = 1f; //0.1f; 
        public float sizeMicMax; //0.5f;
        public float sizeMicMin; //0.05f;

        public float volumeMin;
        public float volumeMax;

        public float audioCollidorSizeMin;
        public float audioCollidorsizeMax;
        //public float scaleSpeed;//0.002f;
        public Vector3 dragFactor;
        public float scaleSpeedDM = 0.5f;
        public Boolean ScaleAudioWithModelIsDone;
        public Vector3 scaleFactor;


        // We'll use Awake to set up our Singleton.
        void Awake()
        {
            // Check if a Singleton already exists.
            if (G == null)
            {
                // If not, we are it.  
                G = this;
            }
            else
            {
                // If one does exist, destroy us.
                Destroy(gameObject);
            }

            // Persist this object across scene changes.
            DontDestroyOnLoad(gameObject);
        }


        void Start()
        {
            sizeMicMax = scaleFactorModel * 30f;
            sizeMicMin = scaleFactorModel;
            dragFactor = Vector3.one;
            //volumeMin = 0.001f;

            //Not needed anymore, as we don't scale audio colliders anymore
            volumeMin = 1;
            volumeMax = 1;
            audioCollidorSizeMin = 0.05f;
            audioCollidorsizeMax = 0.5f;
            ScaleAudioWithModelIsDone = false;
            //scaleSpeed = scaleFactorModel / 50f;

        }

        /// <summary>
        /// When a timer passed 1 sec, this returns true and timer is restarted. Will be only 99.8% exact
        /// </summary>
        /// <returns></returns>
        public bool OneSecondPassed()
        {
            if (stopwatch.ElapsedMilliseconds >= 1000)
            {
                // UnityEngine.Debug.Log("TRUE");
                // UnityEngine.Debug.Log("stopwatch.ElapsedMilliseconds " + stopwatch.ElapsedMilliseconds);
                stopwatch.Restart();

                // UnityEngine.Debug.Log("time done");
                return true;
            }
            else
            {
                // UnityEngine.Debug.Log("stopwatch false");
                // UnityEngine.Debug.Log("stopwatch.ElapsedMilliseconds " + stopwatch.ElapsedMilliseconds);
                return false;
            }
        }
    }
}