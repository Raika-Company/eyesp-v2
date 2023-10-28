# EYESP.LIVE API Endpoints

## Dashboard Page

**Avarage Metrics:**
sample url: `status.eyesp.live/v1/dashboard/metrics`

sample output:
```json
{
	"internal-ping": 31,
	"external-ping": 52,
    "download": 12,
    "upload": 6,
    "IGW": 1490026,
    "IXP": 2320026
}
```

**State of internal data centers**
sample url: `status.eyesp.live/v1/dashboard/isps`

sample output:
```json
{
    "hamrahaval": 200,
    "irancel": 200,
    "rightel": 403,
    "mobinnet": 200
}
```

**State of external data centers**
sample url: `status.eyesp.live/v1/dashboard/sites`

sample output:
```json
{
    "google": 200,
    "github": 200,
    "amazon": 403,
    "stackoverflow": 200
}
```

**Disturbances by Province:**
sample url: `status.eyesp.live/dashboard/province-disturbances`

sample output:
```json
{
    "ardabil": 5,
    "azerbaijan, east": 12,
    "azerbaijan, west": 7,
    "tehran": 15,
    "isfahan": 10,
    "khorasan, razavi": 8,
    "fars": 6,
    "khuzestan": 4,
}
```
