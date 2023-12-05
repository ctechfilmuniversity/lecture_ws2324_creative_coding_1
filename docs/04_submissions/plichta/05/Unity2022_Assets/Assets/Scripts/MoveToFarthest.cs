using System;
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using Random = UnityEngine.Random;

namespace com.artbymarek.experiments {

    //too little time to figure this out myself, so ChatGTP helped. Still needed to debug some things
    //This moves object to the furthest cube. I use it to move the lights around quickly 
    public class MoveToFarthest : MonoBehaviour {
        //public GameObject[] _objList;
        public List<GameObject> _objList = new List<GameObject>();
        public float duration = 10f;

        private Vector3 originalPosition;
        public Space space;

        private void Start() {

            _objList = space.objList;
            originalPosition = transform.position;
            StartCoroutine(MoveToFarthestAndBack());
        }

        

        private IEnumerator MoveToFarthestAndBack()
        {
            while (true)
            {
                GameObject farthestObject = GetFarthestObject();
                if (farthestObject != null)
                {
                    yield return MoveToPosition(farthestObject.transform.position, duration / 2);
                    yield return MoveToPosition(originalPosition, duration / 2);
                }

                float randomPause = Random.Range(1f, 10f);
                yield return new WaitForSeconds(randomPause);
            }
        }

        private GameObject GetFarthestObject() {
            GameObject farthest = null;
            float maxDistance = float.MinValue;

            foreach (GameObject obj in _objList) {
                float distance = Vector3.Distance(transform.position, obj.transform.position);
                if (distance > maxDistance) {
                    farthest = obj;
                    //Debug.Log(obj.transform.position);
                    maxDistance = distance;
                }
            }

            return farthest;
        }

        private IEnumerator MoveToPosition(Vector3 targetPosition, float time) {
            Vector3 startPosition = transform.position;
            float elapsedTime = 0;

            while (elapsedTime < time) {
                transform.position = Vector3.Lerp(startPosition, targetPosition, (elapsedTime / time));
                elapsedTime += Time.deltaTime;
                yield return null;
            }

            transform.position = targetPosition;
        }
    }
}