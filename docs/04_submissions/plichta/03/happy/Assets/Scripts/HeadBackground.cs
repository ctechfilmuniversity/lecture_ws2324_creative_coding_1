using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Moments.DefaultNamespace {
    public class HeadBackground : MonoBehaviour {
        private MeshFilter mesh;
        private float rotationSpeed = 100f;

        private void Start() {
        }

        private void Update() {
            
            gameObject.transform.Rotate(new Vector3(2f, 0, 0f) * Time.deltaTime * rotationSpeed);
        }
    }
}