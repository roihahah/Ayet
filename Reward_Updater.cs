using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

[System.Serializable]
public class CoinsData
{
    public int coins;
}

public class Reward_Updater : MonoBehaviour
{
    private string rewardCheckUrl = "https://b045-147-235-207-222.ngrok-free.app/check";
    void Start()
    {
        StartCoroutine(CheckRewardsCoroutine());
    }

    IEnumerator CheckRewardsCoroutine()
    {
        while (true)
        {
            //sends get request from server to check if user balance changed
            UnityWebRequest www = UnityWebRequest.Get(rewardCheckUrl + "?userId=" + SystemInfo.deviceUniqueIdentifier);
            yield return www.SendWebRequest();

            if (www.result == UnityWebRequest.Result.Success)
            {
               
                int coins = ParseCoinsFromResponse(www.downloadHandler.text);
                PlayfabManager.instance.AddVirtualCurrency(coins); 
            }
            else
            {
                Debug.LogError("Error checking for reward updates: " + www.error);
            }

           
            yield return new WaitForSeconds(60);
        }
    }

    private int ParseCoinsFromResponse(string response)
    {
        //gets the coins from the response and returns them
        CoinsData data = JsonUtility.FromJson<CoinsData>(response);
        return data.coins; 
    }

}
