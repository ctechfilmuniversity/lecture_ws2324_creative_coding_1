using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Moments.com.artbymarek.experiments.circles {
    public class UI : MonoBehaviour {
        private string debugText = "HOLD ARROW KEY DOWN TO REDUCE NOISE";

        void OnGUI() {
            Rect rect2 = new Rect(10, 10, 300, 60);
            // Set style (optional)
            GUIStyle style2 = new GUIStyle();
            style2.fontSize = 12;
            style2.normal.textColor = Color.magenta;
            // Draw the label
            GUI.Label(rect2, debugText, style2);
            
            // Set position and size
            Rect rect = new Rect(10, 11, 300, 60);

            // Set style (optional)
            GUIStyle style = new GUIStyle();
            style.fontSize = 12;
            style.normal.textColor = Color.grey;
            // Draw the label
            GUI.Label(rect, debugText, style);
            
            
            
        }

        // Update is called once per frame
        void Update() {
            // Update the debugText with whatever information you want to display
            //debugText = "Updated text: " + Time.time;
        }
    }
}