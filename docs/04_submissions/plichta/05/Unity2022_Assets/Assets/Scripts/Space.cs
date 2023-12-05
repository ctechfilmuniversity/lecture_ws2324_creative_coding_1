using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Serialization;
using UnityEngine.UIElements;
using Random = UnityEngine.Random;

namespace com.artbymarek.experiments {
    public class Space : MonoBehaviour {
        private GameObject _obj;

        public float jiggle;
        [FormerlySerializedAs("_objList")] public List<GameObject> objList = new List<GameObject>();
        private List<Vector3> _allVertices = new List<Vector3>();

        private LineRenderer lineRenderer;

        private int _k = 0;
        private float _lineThicknessIncrease;
        private int _step2 = 1;

        private float _timer = 0.0f;
        private float _timerJiggle = 0.0f;
        private float _timerFadeOut = 0.0f;

        private float _delay = 0.1f;
        private float _jiggleDuration = 4f;
        private float _timerJiggleActive = 2f;

        private float _delayJiggleStart = 5f;


        private Camera cam;
        private bool _jiggle = false;


        // Start is called before the first frame update
        private void Awake() {
            cam = FindObjectOfType<Camera>();
            CreateCubes();
        }

        void Start() {
            jiggle = 0.03f;

            SetupLines();
        }

        private void SetupLines() {
            GameObject lineRendererObject = new GameObject("LineRendererObject");
            lineRenderer = lineRendererObject.AddComponent<LineRenderer>();
            // lineRenderer.startWidth = 0.001f;
            // lineRenderer.endWidth = 0.001f;
            lineRenderer.startWidth = 0.1f;
            lineRenderer.endWidth = 0.1f;
            //lineRenderer.material = new Material(Shader.Find("Particles/Standard Unlit"));
            lineRenderer.material = new Material(Shader.Find("Standard"));

            Color grey = new Color(0.25f, 0.27f, 0.25f);
            lineRenderer.material.SetColor("_Color", grey);
        }

        private void CreateCubes() {
            for (int x = 0; x < 10; x = x + 1) {
                for (int y = 0; y < 10; y = y + 1) {
                    for (int z = 0; z < 10; z = z + 1) {
                        _obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
                        //_obj.transform.localScale = new Vector3(0.8f, 0.8f, 0.8f);
                        //_obj.GetComponent<BoxCollider>().size = new Vector3(0.8f, 0.8f, 0.8f);
                        //_obj.transform.position = new Vector3(x, y, z);
                        _obj.transform.position = new Vector3(x, y, z);
                        _obj.AddComponent<Rigidbody>();
                        _obj.GetComponent<Rigidbody>().useGravity = false;
                        //_obj.GetComponent<Rigidbody>().isKinematic = true; //deactivate physics first

                        Renderer renderer = _obj.GetComponent<Renderer>();
                        // float r = 0.9f + x * 3 / 15f;
                        // float g = 0.1f + y * 4 / 15;
                        // float b = 0.5f + z * 2 / 15;
                        // renderer.material.color = new Color(r, g, b);
                        renderer.enabled = false;
                        objList.Add(_obj);
                        //UpdateAllVertices(obj);
                    }
                }
            }
        }


        // Update is called once per frame
        void Update() {
            UpdateAllVertices();
            CheckForKeyboardInput();

            //NavigateCamera();

            MoveCubes();

            DrawLines();
        }


        private void MoveCubes() {
            _timer += Time.deltaTime;
            if (_timer > _delay) {
                foreach (var gameObject in objList) {
                    //gameObject.GetComponent<Rigidbody>().isKinematic = false;
                    //gameObject.GetComponent<Rigidbody>().AddForce(_obj.transform.forward * 200f);
                }

                int ranNum = (int) Random.Range(0, objList.Count - 1);
                //Rigidbody rb;
                //rb.AddForce();
                //_objList[ranNum].GetComponent<Rigidbody>().AddForce(_obj.transform.up * 20f);
                float x = Random.Range(0, 0.4f);
                float y = Random.Range(0, 1f);
                float z = Random.Range(0, 1.2f);

                //_objList[ranNum].GetComponent<Rigidbody>().AddForce(new Vector3(x, y, z) * 20f); // apply force in the (1,2,3) direction
                objList[ranNum].GetComponent<Rigidbody>()
                    .AddForce(new Vector3(x, y, z) * 22f); // apply force in the (1,2,3) direction

                //ranNum = (int) Random.Range(0, _objList.Count - 1);
                //_objList[ranNum].GetComponent<Rigidbody>().AddForce(_obj.transform.forward * 20f);
                _timer = 0f;
            }
        }

        public void UpdateAllVertices() {
            // Clear the _allVertices List
            _allVertices.Clear();
            // Iterate over all cubes and fetch their vertices
            foreach (GameObject obj in objList) {
                Mesh mesh = obj.GetComponent<MeshFilter>().mesh;
                Vector3[] vertices = mesh.vertices;

                for (int i = 0; i < vertices.Length; i = i + 1) {
                    Vector3 worldVec = obj.transform.TransformPoint(vertices[i]);
                    _allVertices.Add(worldVec);
                    //Debug.Log(worldVec);
                }
            }
        }


        private void DrawLines() {
            float oldValue = cam.fieldOfView;
            float newValue = MapValue(oldValue, 12, 70, 0.0005f, 0.35f);
            // lineRenderer.startWidth = 0.001f + _lineThicknessIncrease/1000f;
            // lineRenderer.endWidth = 0.001f + _lineThicknessIncrease/1000f;
            lineRenderer.startWidth = newValue;
            lineRenderer.endWidth = newValue;
            // Color grey = new Color(1f, 0.15f, 0.15f);
            // //Color grey = new Color(40f, 50f, 40f);
            // lineRenderer.startColor = grey;
            // lineRenderer.endColor = grey;

            //Debug.Log(lineRenderer.startWidth);

            lineRenderer.positionCount = _allVertices.Count;
            for (int i = 0; i < lineRenderer.positionCount; i++) {
                //JiggleMesh(_objList[i]);

                _k = _k + _step2;
                if (_k > _allVertices.Count - 1) {
                    _k = _allVertices.Count - 1;
                }

                int ranChance = Random.Range(0, 1);
                // int maxRandom = 1;
                // if (ranChance < 0.5f) {
                //     maxRandom = 20;
                // }
                int vert;
                // vert = _k;
                // _timerJiggle += Time.deltaTime;
                //
                // if (_timerJiggle >= _delayJiggleStart && !_jiggle) {
                //     _jiggle = true;
                //     _timerJiggle = 0f;
                // }
                //
                // if (_jiggle) {
                //     _timerJiggleActive += Time.deltaTime;
                //     int ranJump = (int) Random.Range(5, 7);
                //     vert = _k + ranJump;
                //     // _step2 = _step2 + 1;
                //
                //     if (_timerJiggleActive >= _jiggleDuration) {
                //         _jiggle = false;
                //         _timerJiggleActive = 0f;
                //     }
                // } else {
                //     vert = _k;
                // }
                vert = _k;

                if (vert > lineRenderer.positionCount - 1) {
                    vert = lineRenderer.positionCount - 1;
                }


                //lineRenderer.SetPosition(i, _allVertices[k]);
                lineRenderer.SetPosition(i, _allVertices[vert]);
            }

            _k = 0;
        }

        private void CheckForKeyboardInput() {
            if (Input.GetKeyDown(KeyCode.W)) {
                _lineThicknessIncrease = _lineThicknessIncrease + 1;
            }

            if (Input.GetKeyDown(KeyCode.S)) {
                _lineThicknessIncrease = _lineThicknessIncrease - 1;
            }

            if (Input.GetKeyDown(KeyCode.D)) {
                _step2 = _step2 + 1;
            }

            if (Input.GetKeyDown(KeyCode.A)) {
                _step2 = _step2 - 1;
            }
        }

        //Thanks ChatGTP:
        //map min/max values a,b to values x,y
        public float MapValue(float value, float oldMin, float oldMax, float newMin, float newMax) {
            return newMin + (value - oldMin) * (newMax - newMin) / (oldMax - oldMin);
        }
    }
}