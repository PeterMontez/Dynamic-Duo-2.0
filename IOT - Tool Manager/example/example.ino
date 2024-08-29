/**
 * SYNTAX:
 *
 * T RealtimeDatabase::get<T>(<AsyncClient>, <path>);
 * T RealtimeDatabase::get<T>(<AsyncClient>, <path>, <DatabaseOptions>);
 *
 * T - The type of value to return.
 * <AsyncClient> - The async client.
 * <path> - The node path to get the value.
 * <DatabaseOptions> - The database options (DatabaseOptions).
 *
 * In case of data filtering and additional request options are required,
 * the DatabaseOptions can be assigned to the get function.
 *
 * Please see examples/Database/extras/FilteringData/FilteringData.ino for how to filter the data.
 *
 * The value of type T returns from sync Get functions is primitype type value or Arduino String.
 *
 * In case of error, the operation error information can be obtain from AsyncClient via aClient.lastError().message() and
 * aClient.lastError().code().
 *
 * Note that the objects used as placeholder (input) that introduced to use in Push, Update and Set i.e.
 * bool_t, number_t, string_t and object_t cannot be used to keep the output value.
 *
 * The complete usage guidelines, please visit https://github.com/mobizt/FirebaseClient
 */

#include <Arduino.h>
#include <WiFi.h>

#include <FirebaseClient.h>

#define WIFI_SSID "Vivo-Internet-BF17"
#define WIFI_PASSWORD "78814222"

// The API key can be obtained from Firebase console > Project Overview > Project settings.
#define API_KEY "AIzaSyBV_kzhbRUpzOOY2NhpCt3uXF2jppCiFvI"

// User Email and password that already registerd or added in your project.
#define USER_EMAIL "etscuritiba@gmail.com"
#define USER_PASSWORD "etsps2024401"
#define DATABASE_URL "https://toolmanager-b1304-default-rtdb.firebaseio.com/"

void authHandler();

void printError(int code, const String &msg);

void printResult(AsyncResult &aResult);

DefaultNetwork network; // initilize with boolean parameter to enable/disable network reconnection

UserAuth user_auth(API_KEY, USER_EMAIL, USER_PASSWORD);

FirebaseApp app;

#include <WiFiClientSecure.h>
WiFiClientSecure ssl_client;

using AsyncClient = AsyncClientClass;

AsyncClient aClient(ssl_client, getNetwork(network));

RealtimeDatabase Database;

AsyncResult aResult_no_callback;

void setup()
{

    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Firebase.printf("Firebase Client v%s\n", FIREBASE_CLIENT_VERSION);

    Serial.println("Initializing app...");

    ssl_client.setInsecure();

    initializeApp(aClient, app, getAuth(user_auth), aResult_no_callback);

    authHandler();

    // Binding the FirebaseApp for authentication handler.
    // To unbind, use Database.resetApp();
    app.getApp<RealtimeDatabase>(Database);

    Database.url(DATABASE_URL);

    // In case setting the external async result to the sync task (optional)
    // To unset, use unsetAsyncResult().
    aClient.setAsyncResult(aResult_no_callback);

    // Library does not provide JSON parser library, to get JSON object, get the string and deseialize it.

    Serial.print("Get int... ");
    int v1 = Database.get<int>(aClient, "01/key");
    if (aClient.lastError().code() == 0)
        Serial.println(v1);
    else
        printError(aClient.lastError().code(), aClient.lastError().message());
}

void loop()
{
    authHandler();

    Database.loop();
}

void authHandler()
{
    // Blocking authentication handler with timeout
    unsigned long ms = millis();
    while (app.isInitialized() && !app.ready() && millis() - ms < 120 * 1000)
    {
        // The JWT token processor required for ServiceAuth and CustomAuth authentications.
        // JWT is a static object of JWTClass and it's not thread safe.
        // In multi-threaded operations (multi-FirebaseApp), you have to define JWTClass for each FirebaseApp,
        // and set it to the FirebaseApp via FirebaseApp::setJWTProcessor(<JWTClass>), before calling initializeApp.
        JWT.loop(app.getAuth());
        printResult(aResult_no_callback);
    }
}

void printResult(AsyncResult &aResult)
{
    if (aResult.isEvent())
    {
        Firebase.printf("Event task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.appEvent().message().c_str(), aResult.appEvent().code());
    }

    if (aResult.isDebug())
    {
        Firebase.printf("Debug task: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());
    }

    if (aResult.isError())
    {
        Firebase.printf("Error task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());
    }
}

void printError(int code, const String &msg)
{
    Firebase.printf("Error, msg: %s, code: %d\n", msg.c_str(), code);
}