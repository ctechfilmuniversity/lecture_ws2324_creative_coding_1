using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;

using UnityEngine;

namespace com.artbymarek.experiments {
    public class NavigateCamera : MonoBehaviour {
        private Camera _cam;

        public float mouseSensitivity = 15f;
        public Transform playerBody;

        private float _xRotation = 0f;
        private float _zoom = 0;
        private float _initialFieldOfView;

        private bool movecam;

        private bool once = false;
        private float cameraPosOrigin;

        private float _camStep;

        // Start is called before the first frame update
        void Start() {
            
            Cursor.lockState = CursorLockMode.Locked; // Locks the cursor to the center of the screen
        }

        private void Awake() {
            _cam = this.gameObject.GetComponent<Camera>();
            _initialFieldOfView = _cam.fieldOfView;
        }

        // Update is called once per frame
        void Update() {
            _camStep = 0;
            //Change Zoom with key preses. Zoom is cam field of view in this case
            //if (Input.GetMouseButton(0)) {
            if (Input.GetKey(KeyCode.DownArrow)) {
                _zoom = _zoom + 0.04f;
                _camStep = _camStep + 0.01f;
            }

            if (Input.GetKey(KeyCode.UpArrow)) {
                _zoom = _zoom - 0.04f;
                _camStep = _camStep - 0.01f;
            }

            if (_zoom > 58) {
                _zoom = 58;
              //  movecam = true;
            }

            if (_zoom < 0) {
                _zoom = 0;
            }
            if (_camStep > 35) {
                _camStep = 35;
                //movecam = true;
            }

            if (_camStep < 0) {
                _camStep = 0;
            }

            _cam.fieldOfView = _initialFieldOfView + _zoom;
            // if (movecam) {
            //     Vector3 position = _cam.transform.position;
            //     if (once) {
            //         cameraPosOrigin = position.z;
            //         once = false;
            //     }
            //     //Vector3() zed = new Vector3(0,0,_cam.transform.position.z  ) ;
            //     //zed = _cam.transform.position.z + _zoom;
            //      
            //     position.z = _zoom;
            //     Debug.Log("zoom" + _zoom);
            //     Debug.Log("z" + position.z);
            //     _cam.transform.position = position;
            // }

            //position.z += _camStep;
            // Debug.Log("zoom" + _zoom);
            // Debug.Log("z" + position.z);
            Vector3 position = _cam.transform.position;
            position.z += _camStep;
            _cam.transform.position = position;


            // if (cam.fieldOfView < 6) {
            //     ZoomedIn?.Invoke(); //? avoids passing of null, to avoid null pointer exceptions
            // } 

            //Cam follows mouse cursor.
            //Harder than I thought. Thanks ChatGTP!:
            float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
            float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;
            _xRotation -= mouseY;
            _xRotation = Mathf.Clamp(_xRotation, -90f, 90f); // Limit vertical rotation

            transform.localRotation = Quaternion.Euler(_xRotation, 0f, 0f);
            playerBody.Rotate(Vector3.up * mouseX);
        }
    }
}