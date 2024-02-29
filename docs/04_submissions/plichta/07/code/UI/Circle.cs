using UnityEngine;

namespace com.artbymarek.dirmic
{
    //Not used anymore
    /// <summary>
    /// Circular shape used to project rays into the 3D space as selection for the sound shapes
    /// </summary>
    public class Circle : MonoBehaviour
    {
        private Material CircleMaterial;
        private LineRenderer _lineRenderer;
        public float Radius = 5f; //will be divided by 100 further down so value is easier to adjust in unity
        private float _lastRadius;
        private int _numSegments = 40;
        private float _strokewidth = 0.003f;
        private Color _color = Color.yellow;


        private void Awake()
        {
            // Create a new material with a shader that doesn't cull backfaces
            CircleMaterial = new Material(Shader.Find("Sprites/Default"));
            _lineRenderer = this.gameObject.GetComponent<LineRenderer>();
            if (_lineRenderer == null)
            {
                _lineRenderer = gameObject.AddComponent<LineRenderer>();
            }
            SetupCircle();
        }

        private void Update()
        {
            //if we update the raidus at runtime, update the circle
            if (_lastRadius != Radius) UpdateCircle();
        }
        private void SetupCircle()
        {
            SetupLineRender(); //just some null checks
            _lineRenderer.positionCount = _numSegments + 1; // Plus one to close the circle
            _lineRenderer.startColor = _color;
            _lineRenderer.startWidth = _strokewidth; // Optional: Set the width of the line
            _lineRenderer.endWidth = _strokewidth; // Optional: Set the width of the line

            for (int i = 0; i < _numSegments; i++)
            {
                float angle = 2 * Mathf.PI * i / _numSegments;
                var pos = new Vector3(Mathf.Cos(angle), Mathf.Sin(angle), 0) * (Radius / 100);
                // Set the point in the LineRenderer
                _lineRenderer.SetPosition(i, pos);
            }

            // Set the position of the last point to the same as the first point to close the circle
            _lineRenderer.SetPosition(_numSegments, _lineRenderer.GetPosition(0));

            _lastRadius = Radius;
        }

        public void UpdateCircle(float radius, int numSegments, float strokeWidth, Color color)
        {
            //seems the default radius is only effective here
            Radius = radius;
            _numSegments = numSegments;
            _strokewidth = strokeWidth;
            _color = color;
            // Debug.Log("updated circle"); 
            SetupCircle();
        }

        public void UpdateCircle()
        {
            SetupCircle();
        }

        private void SetupLineRender()
        {
            if (_lineRenderer == null)
            {
                // Give error message to let you know _lineRenderer is not set
                Debug.LogError("_lineRenderer is not set.");
                return;
            }
            _lineRenderer.useWorldSpace = false; // Draw relative to the GameObject, not global space
            _lineRenderer.loop = true; // The line wraps around to form a closed circle
                                       //_lineRenderer.material = new Material(Shader.Find("Standard"));
            if (CircleMaterial != null)
            {
                _lineRenderer.material = CircleMaterial; // Assign the material

            }
            else
            {
                Debug.LogError("Circle Material not assigned!");
            }
        }
    }
}