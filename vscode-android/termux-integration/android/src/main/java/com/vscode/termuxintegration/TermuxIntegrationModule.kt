package com.vscode.termuxintegration

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.annotation.NonNull
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class TermuxIntegrationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "TermuxIntegration"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun checkTermuxAvailability(promise: Promise) {
        try {
            val packageManager = reactContext.packageManager
            val intent = Intent(Intent.ACTION_MAIN).apply {
                addCategory(Intent.CATEGORY_LAUNCHER)
                setPackage("com.termux")
            }

            val resolveInfo = packageManager.resolveActivity(intent, 0)
            val isAvailable = resolveInfo != null

            promise.resolve(isAvailable)
        } catch (e: Exception) {
            promise.reject("ERROR_CHECKING_TERMUX", e)
        }
    }

    @ReactMethod
    fun startTermux(promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_MAIN).apply {
                addCategory(Intent.CATEGORY_LAUNCHER)
                setPackage("com.termux")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }

            reactContext.startActivity(intent)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERROR_STARTING_TERMUX", e)
        }
    }

    @ReactMethod
    fun executeTermuxCommand(command: String, promise: Promise) {
        try {
            val intent = Intent().apply {
                action = "com.termux.RUN_COMMAND"
                putExtra("com.termux.RUN_COMMAND", command)
                putExtra("com.termux.working_directory", "/data/data/com.termux/files/home")
                putExtra("com.termux.use_shell", true)
            }

            reactContext.sendBroadcast(intent)
            promise.resolve("Command sent to Termux")
        } catch (e: Exception) {
            promise.reject("ERROR_EXECUTING_COMMAND", e)
        }
    }

    @ReactMethod
    fun openTermuxInDirectory(directory: String, promise: Promise) {
        try {
            val intent = Intent().apply {
                action = "com.termux.RUN_COMMAND"
                putExtra("com.termux.RUN_COMMAND", "cd $directory && clear")
                putExtra("com.termux.working_directory", directory)
                putExtra("com.termux.use_shell", true)
            }

            reactContext.sendBroadcast(intent)
            promise.resolve("Opened Termux in directory: $directory")
        } catch (e: Exception) {
            promise.reject("ERROR_OPENING_TERMUX", e)
        }
    }

    @ReactMethod
    fun installTermux(promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_VIEW).apply {
                data = Uri.parse("https://f-droid.org/en/packages/com.termux/")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }

            reactContext.startActivity(intent)
            promise.resolve("Opening Termux installation page")
        } catch (e: Exception) {
            promise.reject("ERROR_OPENING_INSTALL_PAGE", e)
        }
    }

    @ReactMethod
    fun getTermuxVersion(promise: Promise) {
        try {
            val packageManager = reactContext.packageManager
            val packageInfo = packageManager.getPackageInfo("com.termux", 0)
            val version = packageInfo.versionName

            promise.resolve(version)
        } catch (e: Exception) {
            promise.reject("ERROR_GETTING_VERSION", e)
        }
    }
}