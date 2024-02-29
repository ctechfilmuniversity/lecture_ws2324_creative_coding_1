using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

namespace com.artbymarek.dirmic
{
    /// <summary>
    /// Project Unitys Audiolistener on any colliding mesh so we can simulate a directional microphone
    /// </summary>
    public class PlaceAudiolistenerInSpace : MonoBehaviour
    {
        private Camera _cam;
        private Vector3 _centerScreen;
        private float _circleRadius;
        private Indicator _micMarker;
        private RaycastHit _lastHit;
        private static RaycastHit DefaultHit = new RaycastHit();

        private void Awake()
        {
            _cam = Camera.main; //FindObjectOfType<Camera>();
        }

        // Start is called before the first frame update
        void Start()
        {
            _centerScreen = new Vector3(Screen.width / 2f, Screen.height / 2f);
            _micMarker = FindObjectOfType<Indicator>();
        }

        // Update is called once per frame
        void Update()
        {
            //get the intersection point of the ray with the landscape mesg
            RaycastHit hitPos = GetRayHitPos();
            //Absolute drag is basically a counter, going from 0 to plus slowly with each drag. Default is 1
            DrawMic(_centerScreen, hitPos, InputScalesUI.AbsoluteDrag);
            PlaceMic(hitPos);
            //SoundNuggets.ChangeVolume(20f);
        }

        private void PlaceMic(RaycastHit hitpos)
        {
            this.GameObject().transform.position = hitpos.point;
        }


        private void DrawMic(Vector3 posScreen, RaycastHit posInSpace, Vector3 scale)
        {
            Vector3 micPos = _cam.ScreenToWorldPoint(new Vector3(
                posScreen.x,
                posScreen.y,
                posInSpace.distance)
            );
            //move and rotate so it is facing the camera
            //the png is rotate 90 degree within a parent GB
            _micMarker.transform.position = micPos;
            _micMarker.transform.rotation = _cam.transform.rotation;

            //TODO Only if touch input
            //scale the mic graphic. scale variable is an absolute value here, feeded through a counter that grows/shrinks with dragging 
            float micSize = scale.y;
            //cap the size //not needed anymore as I am doing this in the Touchclass already
            if (micSize > GLOBAL.G.sizeMicMax)
            {
                micSize = GLOBAL.G.sizeMicMax;
            }

            if (micSize < GLOBAL.G.sizeMicMin)
            {
                micSize = GLOBAL.G.sizeMicMin;
            }

            Vector3 scaleFactor = new Vector3(micSize, micSize, micSize);
            _micMarker.transform.localScale = scaleFactor;
        }

        private RaycastHit GetRayHitPos()
        {
            Ray ray;
            RaycastHit hit;
            ray = _cam.ScreenPointToRay(_centerScreen);

            if (Physics.Raycast(ray, out hit))
            {
                _lastHit = hit;
                return hit;
            }
            else
            {
                //in case we have a hickup and don't get a ray hit
                if (_lastHit.collider != null)
                {
                    return _lastHit;
                }
                else
                {
                    Debug.Log("Raycast didn't hit anything");
                    //TODO: this is not really helping much, does it? an empty ray hit...
                    return DefaultHit; //not sure what this will give us actually, 000?
                }
            }
        }
    }
}