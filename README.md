# InvyCheck Working in github


Team 6: Aaron Giang, Kevin Terwelp, Loi Le, Mohammad Qudoom, Miguel Dominguez
Product Design Document

Objective of Product:
 Busy families experience a lot of inconveniences revolving around their inability to look inside their refrigerators because they are not at home at the moment. The objective of this product is to alleviate these pains by providing both an up-to-date image of the fridge contents as well as an itemized list through the usage of an app on a smartphone. 

Primary Pain: 
Family can only go grocery shopping once a week or once every two weeks 
Not knowing refrigerator contents could result in either purchasing extra of some food item, or forgetting to purchase a food item. 
Food waste from double purchasing food items. 
Time inconvenience if family needs to go back to the store for necessities that were forgotten 

Other Pain(s): 
	Minor concerns that families have include: 
Nutritional and food variety concerns
Not knowing what to cook with the available items inside the fridge

Solution: 
	Create a machine that fits inside of the user’s refrigerator and angle it in a way that it captures as much of the refrigerator’s contents as possible. The machine analyzes the picture and produces an itemized list of the refrigerator’s contents. The list and picture are sent to the user’s phone through the app.  This allows the user access to their refrigerator’s contents at any time. 
	Additionally, the app will suggest recipes based on items in the list. 

Platform / Minimum Hardware Requirements 
We used :
 Raspberry Pi 4 Model B 2019 Quad Core 64 Bit WiFi Bluetooth 
Raspberry Pi Camera Module 5MP 1080p OV5647 Sensor Video Webcam Compatible with 6inch 15Pin Ribbon Cable for Raspberry Pi Model A/B/B+,Pi 2 and for Raspberry Pi 2.3,3B+ and Pi 4 
Alternative:  
Kuman for Raspberry Pi Camera Module 5MP 1080P Ov5647 Sensor HD Video Webcam Supports Night Vision SC15
MicroSD 16 - 64gigs
Smartphone
Frontend / Backend: 
Frontend:
We used ReactJS and MaterialUI library to create a friendly interface on mobile devices.
We designed 3 main tabs for “Your Fridge,” “Recipe,” and “Profile”.
To demonstrate the connection to your mobile device, Raspberry Pi will host the frontend and it can be accessed via the Raspberry Pi IP address.  In addition, there is 1 small API to request Raspberry Pi to take pictures and analyze what items are detected inside the picture.
Backend:

This is our minimal database design at the moment to communicate with the frontend,  manipulate data, categorize food items and store them.
Our technologies include the use of Flask Python to set up REST APIs and Amazon Web Services to be our database management system.
The database is run on a local PC as a demonstration for the server system.

Machine Learning - Tensorflow

Google’s open source machine learning platform, Tensorflow, was used to develop and train the machine learning model used in the mvbp. 
The custom ML model was trained using the faster_rcnn_inception_v2_pets training module. The custom model was then converted to Tensorflow Lite so that it is compatible with the Raspberry Pi. 
Object identification occurs on the Raspberry Pi with the custom ML model using the Tensorflow Lite API. 




Team 6: Aaron Giang, Kevin Terwelp, Loi Le, Mohammad Qudoom, Miguel Dominguez
Storyboard 

Schematic/blueprint

The Machine 






























Operational Blueprint

MVBP AppMVBP Feature and its Operation

Features: 
Capture an image from inside of the fridge and send it to the app on the user’s smartphone. 
Analyze the image to produce an itemized list of food accessible to the user. 
Take the existing food item list and produce several recipe suggestions based on the existing food items listed. 

Operation: 

The user operates the MVBP through a React application.  The application contains the following subsections:

Fridge Subsection 
From the “Your Fridge” subsection, the user presses the capture button to initiate the process. This turns on the camera on the Raspberry Pi which then takes a picture of the contents inside of the refrigerator. 
Through the Tensorflow Lite API, the Raspberry Pi then analyzes the image and creates an itemized list of food items that were identified. 
The itemized list is then accessible from the “Your Fridge” subsection of the React application. 

Recipe Subsection 
In the “Recipe” subsection, the user is provided some suggested recipes based on the items identified inside the refrigerator. 
The “Recipe” subsection will also let you know how many ingredients you are currently missing from the recipe. 

USER MANUAL 
Your Fridge

Capturing Image of Refrigerator Contents 
Click on the “Your Fridge” button on the InvyCheck application 
Press the blue “Capture” button 
The InvyCheck machine will display an updated image of the user’s refrigerator contents. 
To access the updated refrigerator content list, the user presses the blue “Your Fridge” button. 

Accessing the Refrigerator Content List 
Click on the “Your Fridge” button on the InvyCheck Application to access the refrigerator content list.
The refrigerator content list can then be updated by pressing the blue “Capture” button. Refer back to the “Capturing Image of Refrigerator Contents” section for more information.

Recipe Suggestions 



Accessing Recipe Suggestions 
In the InvyCheck application, click on the “Recipe” button to access the suggested list of recipes based on the refrigerator content list. 
The recipes will inform you of how many ingredients are missing. 


