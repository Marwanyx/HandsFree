## 💡 Inspiration 💡
Have you ever been in a situation where you just didn't want to or just straight up could not use your keyboard and mouse? Rather just wished to control it with your mind? Well, this is an issue we faced, and we decided to solve it. HandsFree is an AI-based program created to help you navigate your computer with no physical touch at all!. Machines being able to register human movements and being able to interact with us has been our main source of inspiration for this project. We decided to implement a system where our own AI-powered app uses both Natural Language Processing and Computer Vision to recognize speech & gestures, then “thinks” and performs a command accordingly.

## ❓ What it does ❓
HandsFree is a desktop app that actively listens for keywords and gestures, then performs a command accordingly. It aims to completely minimize the need to use your mouse and keyboard.

## 🏗️ How we built it 🏗️


App:
- App is built in Python, HTML, CSS, and JavaScript.
- Mediapipe and OpenCV are used to recongize gestures.
- SpeechRecignition is used to translate speech to text.

Website:
- Website is built using React and Next.js.
- Authentication System is built using Auth0.
- Software Licensing is done using OpenScreen.
 
## 🚧 Challenges we ran into 🚧
- Had trouble compiling our app to an executable file due to a variety of issues with the libaries we were using.
- Had trouble getting the gesture recignition to work properely with dark lighting.
 
## ✅ Accomplishments that we're proud of ✅
- Implemented a system that can recognize speech and gestures not just one or the other which has already been done before but a combination of both. 
- Implemented a creative use case of OpenScreen's API by creating a software licensing system.
- Finishing this project in time, was by far the biggest accomplishment of this project.

## 🙋‍♂️ What we learned 🙋‍♂️
- We learned how to use "eel", a Python libary that allows you to create a modern and customizable GUI using HTML, CSS and Javascript unlike tkinter and PyQt, while still having access to Python.
- We learned how to use "OpenScreen" to create a software licensing system.
- We learned how to use "Auth0" to create an authentication system.
- We improved our knowledge on how to implement a classification system using "Mediapipe" and "OpenCV".
## 💭 What's next for HandsFreeBrowse 💭
We plan on making this project more accurate by training the ML model extensively, to produce a smoother app. We also have plans to implement this program on mobile as well.

## How to run
```
Make sure you have python, and anocanda installed.
```
```
Download the Zip file from https://handsfreee.web.app/
```
```
Unzip
```
```
conda create --name handsfree python=3.8.5
```
```
conda activate handsfree
```
```
pip install -r requirements.txt
```
```
conda install PyAudio
```
```
conda install pywin32
```
```
cd to src folder
```
```
Python HandsFree.py
```

