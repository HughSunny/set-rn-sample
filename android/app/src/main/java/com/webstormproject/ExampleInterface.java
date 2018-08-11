package com.webstormproject;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;

import java.util.Map;

import javax.annotation.Nullable;

import static android.app.Activity.RESULT_OK;

/**
 * Created by Hugh on 2018/6/4.
 */

public class ExampleInterface extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final String TAG = ExampleInterface.class.getSimpleName();
    private ReactApplicationContext mReactContext;
    private Promise interfacePromise;
    private ActivityEventListener mActivityEventListener = new ActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode != 1 || resultCode != RESULT_OK) {
                return;
            }
            Uri contactData = data.getData();
            Cursor cursor = activity.managedQuery(contactData, null, null, null,null);
            cursor.moveToFirst();
            String msg = getContactStr(cursor);
            if (msg != null) {
                if (interfacePromise != null) {
                    Log.w(TAG, "interfacePromise back ==>" + msg);
                    interfacePromise.resolve(msg);
                } else {
                    Log.w(TAG, "RCTDeviceEventEmitter back ==>" + msg);
                    sendMessage2RN(msg);
                }
            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    };


    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        mReactContext.addActivityEventListener(mActivityEventListener);
        mReactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "ExampleInterface";
    }

    public void sendMessage2RN(String message){
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRnMsg", message);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    @ReactMethod
    public void HandleMessage(String msg) {
        Log.w(TAG, "HandleMessage RECEIVE MSG FROM RN ==>" + msg);
//        Intent intent = new Intent(mReactContext, Main2Activity.class );
//        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        mReactContext.startActivity(intent);
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        Bundle bundle = new Bundle();//不能少
        mReactContext.startActivityForResult(intent, 1, bundle);
    }

    @ReactMethod
    public void HandlePromiseMessage(String msg, Promise aPromise) {
        Log.w(TAG, "HandlePromiseMessage RECEIVE MSG FROM RN ==>" + msg);

        interfacePromise = aPromise;
//        Intent intent = new Intent(mReactContext, Main2Activity.class );
//        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        mReactContext.startActivity(intent);
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        Bundle bundle = new Bundle();//不能少
        mReactContext.startActivityForResult(intent, 1, bundle);
    }

    @ReactMethod
    public void toOtherPage(String msg) {
        Log.w(TAG, "RECEIVE MSG FROM RN ==>" + msg);
        Intent intent = new Intent(mReactContext, Main2Activity.class );
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);
    }

    public String getContactStr(Cursor cursor) {
        try {
            int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
            String id = cursor.getString(idColumn);
            //获取姓名
            String queryStr = ContactsContract.CommonDataKinds.Phone.CONTACT_ID + "=" + id;
            //指定获取NUMBER这一列数据
            String[] phoneProjection = new String[]{
                    ContactsContract.CommonDataKinds.Phone.NUMBER
            };
            Cursor phoneCursor = mReactContext.getContentResolver().query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    null,//phoneProjection
                    queryStr,
                    null,
                    null);
            String dn = ContactsContract.Contacts.DISPLAY_NAME;
            String pn = ContactsContract.CommonDataKinds.Phone.NUMBER;

            String name = null;
            String num = null;
            //因为每个联系人可能有多个电话号码，所以需要遍历
            if (phoneCursor != null && phoneCursor.moveToFirst()) {
                for (; !phoneCursor.isAfterLast(); phoneCursor.moveToNext()) {
                    name = cursor.getString(cursor.getColumnIndex(dn));
                    num = phoneCursor.getString(phoneCursor.getColumnIndex(pn));
                }
                phoneCursor.close();
            }
            ContactSimpleInfo info = new ContactSimpleInfo(name, num);
            Gson gson = new Gson();
            String result = gson.toJson(info);
            Log.w(TAG, "getContactStr ==>" + result);
            return result;
        } catch (Exception e) {
            interfacePromise.reject("error while get contact", e);
        }
        return null;
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }

    class ContactSimpleInfo {
        public ContactSimpleInfo(String name,String phone){
            this.name = name;
            this.phone = phone;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        String name;
        String phone;
    }

}
