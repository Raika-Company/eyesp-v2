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

## Disorders page:

sample url: `status.eyesp.live/v1/disorders`

sample output:
```json
[
    {
        "id": 1,
        "type": "پیام‌رسانی",
        "message": "بروزرسانی موفق از سرویس‌های پیام‌رسانی",
        "details": "مشکلات موجود در پیام‌رسانی حل شد",
        "date": "12/04/1402 | 22:35"
    },
    {
        "id": 2,
        "type": "پیام‌رسانی",
        "message": "بروزرسانی ناموفق از سرویس‌های پیام‌رسانی",
        "details": "مشکلاتی در پیام‌رسانی پیش آمده است",
        "date": "12/04/1402 | 20:31"
    }
]
```

## uptime page:

**sites:**

sample url: `status.eyesp.live/v1/uptime/isps`

sample output:
```json
{
    "timestamps": ["22:10", "22:11", "22:12", "22:13", "22:14"],
    "services": [
        {
            "name": "Hamrahaval",
            "icon": "hamrahaval-icon-url",
            "status": ["online", "online", "offline", "online", "online"]
        },
        {
            "name": "Irancel",
            "icon": "irancel-icon-url",
            "status": ["online", "online", "online", "online", "offline"]
        },
        {
            "name": "Zitel",
            "icon": "Zitel-icon-url",
            "status": ["online", "online", "online", "offline", "online"]
        }
    ]
}
```

**isps:**

sample url: `status.eyesp.live/v1/uptime/sites`

sample output:
```json
{
    "timestamps": ["22:00", "23:00", "00:00", "01:00", "02:14"],
    "services": [
        {
            "name": "GITHUB",
            "icon": "github-icon-url",
            "status": ["online", "online", "offline", "online", "online"]
        },
        {
            "name": "AMAZON",
            "icon": "amazon-icon-url",
            "status": ["online", "online", "online", "online", "offline"]
        },
        {
            "name": "GOOGLE",
            "icon": "google-icon-url",
            "status": ["online", "online", "online", "offline", "online"]
        }
    ]
}
```