using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;
using Object = UnityEngine.Object;
using Random = UnityEngine.Random;


namespace com.artbymarek.experiments.happy {
    public class Main : MonoBehaviour {
        //Timer
        private float _timer = 0.0f;
        private float _interval = 0.005f;
        private bool _timePassed = false;

        private int segments = 31;
        private float innerRadius = 3f;
        private float thickness = 0.9f;

        private bool changeJiggle = false;

        //Circles
        public Circles circlePrefab; // this is manually assigned in Unity editor
        private int _numberCircles = 3;
        private List<Circles> _circles = new List<Circles>();
      
        
        
        //TODO: waere vielleicht cool wenn viele kreise im raum schweben und dann einige per zufall? ein gesicht ergeben
        //TODO: Utopie version teddy bear als 3d model (idealweise mit IK) im raum rumschieben und die kreise die zusammenstehen bilden ein gesicht  
        //

        private void Start() {
            drawMesh(31);
        }

        public void drawMesh(int _segments) {
            for (int i = 0; i < _numberCircles; i++) {
                Circles newCircle = Instantiate(circlePrefab);

                segments = _segments;
                newCircle.Initialize(segments, innerRadius, thickness);

                MeshFilter meshFilter = newCircle.GetComponent<MeshFilter>(); //GetComponent<MeshFilter>();
                if (meshFilter == null) {
                    Debug.LogError("MeshFilter component not found!");
                    return;
                }

                if (i == 0) {
                    meshFilter.mesh = newCircle.GenerateMeshRing();
                    //float random = Random.Range(1.2, 1.8);
                    newCircle.transform.position = new Vector3(-1.9f, 10, 0);
                    newCircle.transform.localScale = new Vector3(0.35f, 0.35f, 0.35f);
                    _circles.Add(newCircle);
                }

                if (i == 1) {
                    meshFilter.mesh = newCircle.GenerateMeshRing();
                    //int random = Random.Range(-2, -3);
                    newCircle.transform.position = new Vector3(2.2f, 9, 0);
                    newCircle.transform.localScale = new Vector3(0.35f, 0.35f, 0.35f);
                    _circles.Add(newCircle);
                    //transform.localScale = new Vector3(3, 3, 3);    
                }
                
                newCircle.Initialize(segments-1, innerRadius, thickness);
                
                if (i == 2) {
                    meshFilter.mesh = newCircle.GenerateMeshHalfCircle();
                    Debug.Log("mouth");
                    int random = Random.Range(2, 4);
                    newCircle.transform.position = new Vector3(0, 7, 0);
                    _circles.Add(newCircle);
                }
            }
            
        }
        
        public int NormalizeMousePositionToInt()
        {
            // Calculate the middle of the screen
            Vector2 middle = new Vector2((Screen.width-400) / 2, (Screen.height - 200) / 2);

            // Calculate distance from the center of the screen to mouse
            Vector2 mousePos = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
            Vector2 distanceFromCenter = mousePos - middle;

            // Normalize the distance with respect to the diagonal half-length of the screen
            float normalizedDistance = distanceFromCenter.magnitude / new Vector2((Screen.width -400) / 2, (Screen.height - 200) / 2).magnitude;

            // We want a higher value when close to the center, so we subtract from 1
            normalizedDistance = 1 - normalizedDistance;

            // Remap normalizedDistance (which is in the range [0, 1]) to the range [3, 20]
            int result = Mathf.RoundToInt(Mathf.Lerp(3, 30, normalizedDistance));

            return result;
        }
        
        private void Update() {
            int happynessFactor = 3;
           // if (Input.GetMouseButton(0)) {
                happynessFactor = NormalizeMousePositionToInt();
            //}
            
            //Debug.Log("mouse " + happynessFactor);

            // if (GlobalTimer()) {
                //Varies over time between 3 and 43
                 for (int i = 0; i < _numberCircles; i++) {
                     //check if it needs to be regenerated
                     int newSegments = (int)happynessFactor;
                     DestroyAllCircleMeshes();
                     drawMesh(newSegments);
                     // if (_circles[i].segments != newSegments) {
                     //     _circles[i].segments = newSegments;
                     //     if (i < _numberCircles) {
                     //         _circles[i].RegenerateMeshRing();
                     //     } else {
                     //         _circles[i].RegenerateMeshHalfCircle();
                     //     }
                     //         
                     // }
                
                     if (changeJiggle) {
                         //Debug.Log("jiggle change");
                         if (_circles[i].jiggle < 0.1f) {
                             _circles[i].jiggle += happynessFactor / 10;
                         } else {
                             _circles[i].jiggle += happynessFactor/2;
                         }
                
                
                         if (_circles[i].jiggle < 0.01f) {
                             _circles[i].jiggle = 0.01f;
                         }
                
                         if (_circles[i].jiggle > 1f) {
                             _circles[i].jiggle = 0.3f;
                         }
                     }
                     // _circles[i].JiggleMesh();
                 // }
                 changeJiggle = false;
                
                // Destroy the old mesh to prevent memory leaks
                //if (_meshFilter.mesh != null) {
                // Destroy(_meshFilter.mesh);
                //}
                
            }
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
        
        public void DestroyAllCircleMeshes()
        //chatgtp
        {
            foreach (Circles circle in _circles)
            {
                MeshFilter meshFilter = circle.GetComponent<MeshFilter>();
                if (meshFilter != null)
                {
                    if (meshFilter.mesh != null)
                    {
                        Destroy(meshFilter.mesh);
                    }
                    Destroy(meshFilter);
                }
                Destroy(circle.gameObject);
            }

            // Clear the list
            _circles.Clear();
        }
    }
}