using UnityEngine;

namespace com.artbymarek.dirmic
{
    public class Rectangle : MonoBehaviour
    {
        private Material RectangleMaterial;
        private LineRenderer _lineRenderer;
        // public float Radius = 5f; //will be divided by 100 further down so value is easier to adjust in unity
        private float _lastRadius;
        // private int _numSegments = 10;
        private float _strokewidth = 0.003f;
        private Color _color = Color.yellow;

        public float Width = 0.05f; // Width of the rectangle
        public float Height = 0.2f; // Height of the rectangle
        private float _lastWidth, _lastHeight;


        private void Awake()
        {
            // Create a new material with a shader that doesn't cull backfaces
            RectangleMaterial = new Material(Shader.Find("Sprites/Default"));
            _lineRenderer = this.gameObject.GetComponent<LineRenderer>();
            if (_lineRenderer == null)
            {
                _lineRenderer = gameObject.AddComponent<LineRenderer>();
            }
            SetupRectangle();
        }

        private void Update()
        {
            //if we update the width or height at runtime, update the Rectangle
            if (_lastWidth != Width || _lastHeight != Height) UpdateRectangle();
        }


        private void SetupRectangle()
        {
            SetupLineRender(); //just some null checks
            _lineRenderer.positionCount = 4 + 1; // Plus one to close the Rectangle
            _lineRenderer.startColor = _color;
            _lineRenderer.startWidth = _strokewidth; // Optional: Set the width of the line
            _lineRenderer.endWidth = _strokewidth; // Optional: Set the width of the line

            // Set the positions of the corners of the rectangle
            _lineRenderer.SetPosition(0, new Vector3(-Width / 2, -Height / 2, 0));
            _lineRenderer.SetPosition(1, new Vector3(Width / 2, -Height / 2, 0));
            _lineRenderer.SetPosition(2, new Vector3(Width / 2, Height / 2, 0));
            _lineRenderer.SetPosition(3, new Vector3(-Width / 2, Height / 2, 0));

            // Set the position of the last point to the same as the first point to close the Rectangle
            _lineRenderer.SetPosition(4, _lineRenderer.GetPosition(0));

            _lastWidth = Width;
            _lastHeight = Height;
        }

        public void UpdateRectangle(float width, float height, float strokeWidth, Color color)
        {
            //seems the default width and height is only effective here
            Width = width;
            Height = height;
            _strokewidth = strokeWidth;
            _color = color;
            // Debug.Log("updated Rectangle"); 
            SetupRectangle();
        }

        public void UpdateRectangle()
        {
            SetupRectangle();
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
            _lineRenderer.loop = true; // The line wraps around to form a closed Rectangle
                                       //_lineRenderer.material = new Material(Shader.Find("Standard"));
            if (RectangleMaterial != null)
            {
                _lineRenderer.material = RectangleMaterial; // Assign the material

            }
            else
            {
                Debug.LogError("Rectangle Material not assigned!");
            }
        }
    }
}