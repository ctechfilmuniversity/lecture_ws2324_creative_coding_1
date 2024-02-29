using UnityEngine;
using System.Collections.Generic;

namespace com.artbymarek.dirmic
{
    /// <summary>
    /// Sends Rays with a radius and checks for collisions on Unitys Sound Layer. If so it marks the GB it hit
    /// </summary>
    public class ScanSpaceForAudio : MonoBehaviour
    {
        private CircleCollider2D _scanCircle;
        public LayerMask CollisionLayer;
        private Camera _mainCamera;
        private Vector3 _cameraPosition;
        private Dictionary<GameObject, SoundShape> trackCache = new Dictionary<GameObject, SoundShape>();

        private VisualizeVectors _vizV;

        private List<Vector3> _points = new List<Vector3>();

        private void Awake()
        {
            _scanCircle = this.gameObject.GetComponent<CircleCollider2D>(); //this GB is attached to the object the user controls to scan the environment for sound objects
            _mainCamera = Camera.main;

            _vizV = gameObject.AddComponent<VisualizeVectors>();

        }

        private void Update()
        {
            //XXX shift grid 3 times over 3 frames to reduce resolution requirements/performance if needed
            // Define the resolution of the grid
            int resize = (int)GLOBAL.G.scaleFactor.x / 10;
            if (resize < 1) resize = 1; //when we scale the rectangle UI we need more rays
            int resolution = 50 * 3 * resize; // Increase for more points, decrease for less
            // Calculate the step size based on the resolution
            float stepSize = _scanCircle.radius * 2 / resolution;
            // Get the camera's position
            _cameraPosition = _mainCamera.transform.position;
            float ran = Random.Range(0, 2);
            // _scanCircle.transform.localScale;

            // Iterate over the points in the grid
            for (float x = -_scanCircle.radius / 10; x <= _scanCircle.radius / 10; x += stepSize)
            {
                for (float y = -_scanCircle.radius; y <= _scanCircle.radius; y += stepSize)
                {
                    // Vector3 temp = new Vector3(x, y, 0);
                    // _vizV.DrawRectangle(temp, .1f, .1f, Color.green);
                    // Convert the local point to world point
                    Vector3 point = _scanCircle.transform.TransformPoint(new Vector2(x, y));
                    // Debug.Log("point" + point);

                    // Check if the point is within the circle
                    // if ((point - _scanCircle.transform.position).sqrMagnitude <= _scanCircle.radius * _scanCircle.radius)
                    // {

                    // Calculate the direction from the camera to the point
                    Vector3 direction = (point - _cameraPosition).normalized;
                    // _vizV.DrawRectangle(point, .1f, .1f, Color.green);
                    // Draw the ray in the calculated direction
                    // Debug.DrawRay(point, direction * 10, Color.red, 0.5f);

                    // Create a ray from the point in the calculated direction
                    Ray ray = new Ray(point, direction);
                    // Perform a raycast
                    RaycastHit[] hits = Physics.RaycastAll(ray, Mathf.Infinity, CollisionLayer);
                    foreach (RaycastHit hit in hits)
                    {
                        //optimize performance by caching the track objects
                        // If the ray hit a cube, mark it as such
                        GameObject hitObject = hit.collider.gameObject;
                        if (!trackCache.TryGetValue(hitObject, out SoundShape soundShape))
                        {
                            soundShape = hitObject.GetComponent<SoundShape>(); //Track script is attached to all Soundfiles
                            trackCache[hitObject] = soundShape;
                        }
                        soundShape.MarkedByScanner();
                    }

                    // }
                }
            }

            // for (int i = 0; i < _points.Count; i++)
            // {

            //     _vizV.DrawRectangle(_points[i], 1f, 1f, Color.green);
            // }
        }
    }
}