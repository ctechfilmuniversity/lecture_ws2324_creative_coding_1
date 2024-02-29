using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Serialization;

namespace com.artbymarek.dirmic
{
    /// <summary>
    /// Handles touch input for scaling an object based on swipe gestures.
    /// </summary>
    public class InputScalesUI : MonoBehaviour
    {
        //public GameObject scaleObjectWithTouch; // Assign GameObject here
        //private float scaleSpeed = 0.02f; // Adjust this value to control scale speed
        //private float _touchSensivity = 0.01f;

        //private float _scaleSpeed = Manager.M.scaleSpeedDM; // Adjust this value to control scale speed
        private float _scaleSpeed = 0.08f; // Adjust this value to control scale speed
        private Vector2 _startTouchPosition;
        private Vector2 _currentTouchPosition;
        private bool _isSwiping = false;

        // DragAmplitude is an absolut value.
        // It doesn't go up with dragging distance but just counts up when drag upwards is happening
        // and versa 
        public static Vector3 AbsoluteDrag = new Vector3(1, 1, 1);  //TODO does 0 make sense?

        void Update()
        {

            string test = "Hello, world!";
            int length = test.Length;

            if (Input.touchCount > 0)
            {
                Touch touch = Input.GetTouch(0);

                switch (touch.phase)
                {
                    case TouchPhase.Began:
                        _startTouchPosition = touch.position;
                        //Debug.Log("touch!");
                        _isSwiping = true;
                        break;

                    case TouchPhase.Moved:
                        if (_isSwiping)
                        {
                            _currentTouchPosition = touch.position;
                            var direction = _currentTouchPosition - _startTouchPosition;

                            // Swipe Up
                            //float scaleModifier = direction.y * _touchSensivity; // 
                            if (direction.y > 0)
                            {
                                //float scaleModifier = direction.y * _touchSensivity; // 
                                //this.transform.localScale += Vector3.one * scaleSpeed * scaleModifier ;
                                //dragAmplitude += Vector3.one * scaleSpeed * scaleModifier ;
                                AbsoluteDrag += Vector3.one * _scaleSpeed;
                                float max = GLOBAL.G.sizeMicMax;
                                if (AbsoluteDrag.y > max)
                                {
                                    AbsoluteDrag = new Vector3(max, max, max);
                                }
                            }
                            // Swipe Down
                            else if (direction.y < 0)
                            {
                                //this.transform.localScale -= Vector3.one * scaleSpeed * scaleModifier;
                                //dragAmplitude -= Vector3.one * scaleSpeed * scaleModifier;
                                AbsoluteDrag -= Vector3.one * _scaleSpeed;

                                float min = GLOBAL.G.sizeMicMin;
                                if (AbsoluteDrag.y < min)
                                {
                                    AbsoluteDrag = new Vector3(min, min, min);
                                }
                            }
                            // Debug.Log("dragAmplitude" + AbsoluteDrag);

                            _startTouchPosition = touch.position; // Update start position for continuous scaling
                        }

                        break;

                    case TouchPhase.Ended:
                    case TouchPhase.Canceled:
                        _isSwiping = false;
                        break;
                }
            }
            //to test on mac instead of phone:
            KeyboardTouchSimulator();
            // Debug.Log("AbsoluteDrag:" + AbsoluteDrag);
            GLOBAL.G.dragFactor = AbsoluteDrag;
            // this.gameObject.transform.localScale = AbsoluteDrag;

            Vector3 scale = this.gameObject.transform.localScale;
            //scale this gameobject
            if (AbsoluteDrag.x <= 1f)
            {
                this.gameObject.transform.localScale = AbsoluteDrag;
            }
            else
            {
                scale.x = AbsoluteDrag.x * AbsoluteDrag.x;
                this.gameObject.transform.localScale = scale;
            }
            GLOBAL.G.scaleFactor = scale;

            // Debug.Log("AbsoluteDrag " + AbsoluteDrag);


        }
        private void KeyboardTouchSimulator()
        {
            //Same as with touch input
            if (Input.GetKey(KeyCode.X))
            {
                AbsoluteDrag += Vector3.one * _scaleSpeed / 5f;
                float max = GLOBAL.G.sizeMicMax;
                if (AbsoluteDrag.y > max)
                {
                    AbsoluteDrag = new Vector3(max, max, max);
                }
            }

            if (Input.GetKey(KeyCode.Z))
            {
                AbsoluteDrag -= Vector3.one * _scaleSpeed / 5f;

                float min = GLOBAL.G.sizeMicMin;
                if (AbsoluteDrag.y < min)
                {
                    AbsoluteDrag = new Vector3(min, min, min);
                }
            }
        }
    }
}