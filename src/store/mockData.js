import Mock from 'mockjs'

const testArray = ["一等奖", "二等奖", "三等奖", "四等奖", "五等奖", "六等奖"];

let data = {
    "mock_lotteries": Mock.mock("/api/v1/lotteries/1", "get", {
        "code": 0,
        "msg": "ok",
        "data": {
            "id": 1,
            "created_at": "2019-12-17T16:48:34+08:00",
            "updated_at": "2019-12-17T16:48:34+08:00",
            "deleted_at": null,
            "oid": 0,
            "corp_id": 0,
            "name": "武汉智能公司",
            "gifts|2-4": [
                {
                    "id|+1": 1,
                    "created_at": "2019-12-17T16:48:34+08:00",
                    "updated_at": "2019-12-17T16:48:34+08:00",
                    "deleted_at": null,
                    "oid": 0,
                    "corp_id": 0,
                    "lid": 1,
                    "name": "手机",
                    "count": "@natural(1, 10)",
                    "desc|+1": testArray,
                    "img": "@image(‘900x450’, ‘#02adea’)"
                }
            ]
        }
    }),
    "mock_candidates": Mock.mock("/api/v1/candidates", "get", {
        "code": 0,
        "msg": "ok",
        "data|1-99": [
            {
                "id|+1": 1,
                "name": "@cname",
                "oid": "",
                "corp_id": 0,
                "dep_id": 0,
                "dep_name": "数据部",
                "gift_id": "",
                "gift_name": ""
            }
        ]
    }),
    "mock_lucky": Mock.mock("/api/v1/candidates?t=lucky", "get", {
        "code": 0,
        "msg": "ok",
        "data|1-10": [
            {
                "id|+1": 1,
                "name": "@cname",
                "oid": "",
                "corp_id": 0,
                "dep_id": 0,
                "dep_name": "数据部",
                "gift_id": 2,
                "gift_name": "手环",
            }
        ]
    }),
    "mock_putLucky": Mock.mock(/\/api\/v1\/candidates[\s\S]*?/, "put", {
        "code": 0,
        "msg": "ok",
        "data": null
    })

}

export default data;