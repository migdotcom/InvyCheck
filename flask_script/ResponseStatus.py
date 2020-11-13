import json
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

def checkEmptyResponse(checkRes):
    checkRes = json.loads(checkRes)
    emptyRes = False
    if not checkRes:
        emptyRes = True
    return emptyRes