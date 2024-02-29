using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using com.artbymarek.dirmic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Android;

/// <summary>
/// Represents the playhead in the game that controls the playback of sound shapes.
/// </summary>
public class Playhead : MonoBehaviour
{
	private List<SoundShape> _markedSoundShapes = new List<SoundShape>();
	private List<int> _timestamps = new List<int>();
	private int _currentTimePlayhead;
	private List<int> _timeStampsToBeRemoved = new List<int>();
	private List<SoundShape> _removedSoundShapes;
	private List<SoundShape> _allSoundShapes;

	private void Start()
	{
		_removedSoundShapes = new List<SoundShape>(); //not used
		AudioImporter audioImporter = GetComponent<AudioImporter>();
		_allSoundShapes = audioImporter._allSoundShapes;

	}

	private void Update()
	{
		//After one sound-loop. 
		if (GLOBAL.G.OneSecondPassed())
		{
			RemoveTimestampsOfUnmarkedSoundshapes(); //remove all unmarked sound shaped from the playhead

			//TODO if I ever want to play unmarked soundshapes (like when player triggers a button, I would need to do this, but not for now)
			//To remember: if I don't mute all, I would need to write all soundshapes in an array and then mute them after one loop
			// MarkRemovedSoundShapesToBeMuted(); 

			//Mute everything. Later we unmute all marked. I did this way to complicated in the beginning by trying to mute only what was selected before after the loop was finished
			foreach (SoundShape soundShape in _allSoundShapes)
			{
				soundShape.Mute();
			}
			//Move the playhead to the next closest timestamp
			MovePlayheadFurther();
		}
		//We marked sounshaped (cubes) before and now we go through them and check which are on the playhead
		foreach (SoundShape soundShape in _markedSoundShapes)
		{
			// unmute all sounshapes that have the current timestamp (aka Playhead) in the list
			if (soundShape.Timestamp == _currentTimePlayhead)
			{
				//Play soundshape if muted. Do nothing if already unmuted (aka playing)
				if (soundShape.IsMuted() == true)
				{
					soundShape.Unmute();
					// Doesn't need to be lined up because only plays when Playhead moves					
					// Debug.Log("sounshape been unmuted");
				}
			}
			// not needed anymore since we are muting everything now
			// else 
			// {
			// 	//mute all soundshapes that are not on playhead
			// 	//this needs to happen immediatly instead of LinedUp
			// 	soundShape.Mute(); 
			// }
		}
	}

	private void MovePlayheadFurther()
	{
		if (_timestamps.Count > 0)
		{
			//Sort the list in ascending order. Find the next higher value 
			_timestamps.Sort();
			//if the current timestamp is the highest or higher than anything in the list, start the playhead from the beginning
			int lastTimestamp = _timestamps[_timestamps.Count - 1];
			// Debug.Log("_currentTimestamp " + _currentTimestamp);
			// Debug.Log("lastTimestamp" + lastTimestamp);

			if (lastTimestamp <= _currentTimePlayhead)
			{
				_currentTimePlayhead = _timestamps[0]; //lowest timestamp to current
													   // Debug.Log("current time stamp is lowest time stamp now. Loop from the beginning");

			}
			else
			{ //if the current timestamp is not the highest, we move to the next highest now
				foreach (int value in _timestamps)
				{
					//select the next highest timestamp if there is one
					if (value > _currentTimePlayhead)
					{
						_currentTimePlayhead = value;
						// Debug.Log("next highest timestamp selected" + _currentTimestamp);
						break;
					}
				}
			}
		}
	}
	/// <summary>
	/// when a soundshape was marked, it will be added to the Playhead's list of sounds to play
	/// </summary>
	/// <param name="soundShape"></param>
	public void Add(SoundShape soundShape)
	{
		// Add soundShape to the end of the list
		_markedSoundShapes.Add(soundShape);

		_timestamps.Add(soundShape.Timestamp);
		//When all timestamps were removed or there was no timestamp before, we assign one now
		if (_timestamps.Count == 1)
		{
			// Debug.Log("new timestamp added");
			_currentTimePlayhead = _timestamps[0];
			return;
		}
	}

	public void Remove(SoundShape soundShape)
	{
		//TODO finsih this?, to mute all previously selected, didn't do because I just mute all now
		// _removedSoundShapes.Add(soundShape);
		// Remove the soundShape from the list so it is visually not marked anymore instantly
		_markedSoundShapes.Remove(soundShape);
		//Then remove the timestamp so the playhead ignores it, but only after it finished playing the loop
		//Technically, we just remove any one of that timestamp. There might be other timestamps with the same value left. But we don't need to care about this 
		_timeStampsToBeRemoved.Add(soundShape.Timestamp);
		// Debug.Log("soundshape removed");
		// Debug.Log("timesstamp Added To BE Removed");

	}

	/// <summary>
	/// The playhead plays timestamps added to a list and we remove them all at once after they been umarked (after a loop finsished)
	/// </summary>
	private void RemoveTimestampsOfUnmarkedSoundshapes()
	{
		// foreach (var item in _timeStampsToBeRemoved)
		// {
		// 	Debug.Log("_timeStampsToBeRemoved item " + item);
		// }

		for (int i = 0; i < _timeStampsToBeRemoved.Count; i++)
		{
			int stamp = _timeStampsToBeRemoved[i];
			_timestamps.Remove(stamp);
		}
		_timeStampsToBeRemoved.Clear();
		// Debug.Log("_timeStampsToBeRemoved CLEARED" + _timeStampsToBeRemoved);
	}
}
