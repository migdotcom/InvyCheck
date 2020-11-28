#!/bin/bash

activate() {
    source tflite1-env/bin/activate
    
    python3 TFLite_detection_image.py --modeldir=Sample_TFLite_model --imagedir=../react/src/capture
}

activate