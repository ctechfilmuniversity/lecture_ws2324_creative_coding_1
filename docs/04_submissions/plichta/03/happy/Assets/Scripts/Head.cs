using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Moments.DefaultNamespace {
    public class Head : MonoBehaviour {
        //modified chatgtp
        private float rotationSpeed = 100f;
        private float amplitude = 2.9f; // The height of the oscillation
        private float frequency = 1.9f; // How fast it oscillates

        private Vector3 startPosition;

        private void Start() {
            startPosition = transform.position;
        }

        private void Update() {
            gameObject.transform.Rotate(new Vector3(1f, 1f, 0.02f) * Time.deltaTime * rotationSpeed);

            // Circular motion in the Y-axis
            float y = Mathf.Sin(Time.time * frequency) * amplitude;
            float x = Mathf.Cos(Time.time * frequency) * amplitude;

            gameObject.transform.position = startPosition + new Vector3(x, y*1.2f, x/4);
        }
    }
}