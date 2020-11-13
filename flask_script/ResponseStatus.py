badRES = {
    "status" : "ERROR"
}
goodRES = {
    "status" : "GOOD"
}

def checkGoodStatus(checkRes):
    goodStatus = True
    if (checkRes == badRES):
        goodStatus = False
    return goodStatus