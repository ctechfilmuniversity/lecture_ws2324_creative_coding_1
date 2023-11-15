using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;
using Object = UnityEngine.Object;
using Random = UnityEngine.Random;


namespace com.artbymarek.experiments.circles {
    public class Main : MonoBehaviour {
        //Timer
        private float _timer = 0.0f;
        private float _interval = 0.005f;
        private bool _timePassed = false;

        private int segments = 36;
        private float innerRadius = 1f;
        private float thickness = 0.3f;
        
        private bool changeJiggle = false;

        //Circles
        public Circles circlePrefab; // this is manually assigned in Unity editor
//TODO: nicht alle circles sichtbar, reduzieren und auch distanz wneiger?
//TODO: cool waere wenn jeder circle versetzt sich segmentieren wuerde
//TODO: quick: make light go up and down in sinus way
        private int _numberCircles = 250;
        private List<Circles> _circles = new List<Circles>();

        private void Start() {
            for (int i = 0; i < _numberCircles; i++) {
                Circles newCircle = Instantiate(circlePrefab);

                newCircle.Initialize(segments, innerRadius, thickness);

                MeshFilter meshFilter = newCircle.GetComponent<MeshFilter>(); //GetComponent<MeshFilter>();
                if (meshFilter == null) {
                    Debug.LogError("MeshFilter component not found!");
                    return;
                }

                meshFilter.mesh = newCircle.GenerateRingMesh();
                int random = Random.Range(2, 100);
                newCircle.transform.position = new Vector3(0, 0, random);
                //transform.localScale = new Vector3(3, 3, 3);

                _circles.Add(newCircle);
            }
        }

        private void Update() {
            float changeSpeed = 0;
            //if (Input.GetKeyDown(KeyCode.DownArrow)) {
            if (Input.GetKey(KeyCode.DownArrow)) {
                changeJiggle = true;
                changeSpeed = -0.0010f;
            }
            if (Input.GetKey(KeyCode.UpArrow)) {
                changeJiggle = true;
                changeSpeed = +0.0010f;
            }

          //  if (GlobalTimer()) {
                // Varies over time between 3 and 43
                for (int i = 0; i < _numberCircles; i++) {
                    //check if it needs to be regenerated
                    int newSegments = (int) Mathf.PingPong(Time.time * 5, 15) + 3;
                    if (_circles[i].segments != newSegments) {
                        _circles[i].segments = newSegments;
                        _circles[i].RegenerateMesh();
                    }

                    if (changeJiggle) {
                        Debug.Log("jiggle change");
                        if (_circles[i].jiggle < 0.1f) {
                            _circles[i].jiggle += changeSpeed/4;
                        } else {
                            _circles[i].jiggle += changeSpeed;
                        }

                        
                        if (_circles[i].jiggle < 0.01f) {
                            _circles[i].jiggle = 0.01f;
                        }
                        if (_circles[i].jiggle > 1f) {
                            _circles[i].jiggle = 0.3f;
                        }
                    }
                    _circles[i].JiggleMesh();
                }
                changeJiggle = false;
                
                // Destroy the old mesh to prevent memory leaks
                //if (_meshFilter.mesh != null) {
                // Destroy(_meshFilter.mesh);
                //}
           // }
        }

        private bool GlobalTimer() {
            _timer += Time.deltaTime;
            if (_timer >= _interval) {
                _timePassed = true;
                _timer = 0.0f;
            } else {
                _timePassed = false;
            }

            return _timePassed;
        }
    }
}