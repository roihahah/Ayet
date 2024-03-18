using System;
using System.Drawing;
using UnityEngine;
using WebSocketSharp;


[System.Serializable]
public class CoinsData
{
    public int coins;
}

[Serializable]
public class RegistrationMessage
{
    public string type;
    public string id;

    public RegistrationMessage(string messageType, string clientId)
    {
        type = messageType;
        id = clientId;
    }
}
public class WebSocketManager : MonoBehaviour
{
    WebSocket ws;

    void Start()
    {
        Debug.Log(SystemInfo.deviceUniqueIdentifier);
        ws = new WebSocket("ws://localhost:3000"); 

        ws.OnOpen += (sender, e) =>
        {
            Debug.Log("WebSocket Opened");
            RegisterClient(SystemInfo.deviceUniqueIdentifier);
        };
       

        ws.OnMessage += (sender, e) =>
        {
            Debug.Log("Message Received from Server: " + e.Data);
            CoinsData data =  JsonUtility.FromJson<CoinsData>(e.Data);
            Debug.Log(data.coins);
            PlayfabManager.instance.AddVirtualCurrency(data.coins);
        };

        ws.Connect();
    }

    void RegisterClient(string clientId)
    {
        RegistrationMessage registrationMessage = new RegistrationMessage("register", clientId);
        string jsonMessage = JsonUtility.ToJson(registrationMessage);
        ws.Send(jsonMessage);
        Debug.Log("Registration message sent: " + jsonMessage);
    }

    void OnDestroy()
    {
        if (ws != null)
        {
            ws.Close();
        }
    }
}
