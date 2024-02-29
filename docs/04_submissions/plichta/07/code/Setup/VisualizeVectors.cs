using System.Runtime.CompilerServices;
using UnityEngine;
using UnityEngine.UIElements;
namespace com.artbymarek.dirmic
{
    /// <summary>
    /// Just a small helper class to sometimes visualzie lines for debugging 
    /// </summary>
    public class VisualizeVectors : MonoBehaviour
    {
        private LineRenderer _lineRenderer;

        private void Awake()
        {
            //so we don't accidently add the same component twice to an GB
            _lineRenderer = this.gameObject.GetComponent<LineRenderer>();
            if (_lineRenderer == null)
            {
                _lineRenderer = gameObject.AddComponent<LineRenderer>();
            }
        }

        /// <summary>
        /// Draws a line between two points with a specified color.
        /// </summary>
        /// <param name="start">The starting point of the line.</param>
        /// <param name="end">The ending point of the line.</param>
        /// <param name="color">The color of the line.</param>
        public void DrawLine(Vector3 start, Vector3 end, Color color)
        {
            _lineRenderer.startColor = color;
            _lineRenderer.endColor = color;
            _lineRenderer.positionCount = 2;
            _lineRenderer.SetPosition(0, start);
            _lineRenderer.SetPosition(1, end);
        }

        /// <summary>
        /// Draws a rectangle using a LineRenderer component.
        /// </summary>
        /// <param name="center">The center position of the rectangle.</param>
        /// <param name="width">The width of the rectangle.</param>
        /// <param name="height">The height of the rectangle.</param>
        /// <param name="color">The color of the rectangle.</param>
        public void DrawRectangle(Vector3 center, float width, float height, Color color)
        {
            _lineRenderer.startColor = color;
            _lineRenderer.endColor = color;
            _lineRenderer.positionCount = 5;
            _lineRenderer.SetPosition(0, new Vector3(center.x - width / 2, center.y - height / 2, center.z));
            _lineRenderer.SetPosition(1, new Vector3(center.x + width / 2, center.y - height / 2, center.z));
            _lineRenderer.SetPosition(2, new Vector3(center.x + width / 2, center.y + height / 2, center.z));
            _lineRenderer.SetPosition(3, new Vector3(center.x - width / 2, center.y + height / 2, center.z));
            _lineRenderer.SetPosition(4, new Vector3(center.x - width / 2, center.y - height / 2, center.z));
        }
    }
}