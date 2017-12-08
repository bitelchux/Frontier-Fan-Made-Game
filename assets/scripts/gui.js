vars.menu.menus = {}
vars.menu.menus.scripts = {}
vars.menu.menus.scripts.hover = {}
vars.menu.menus.scripts.click = {}
vars.menu.menus.scripts.hoverstart = {}
vars.menu.menus.scripts.hoverend = {}
vars.menu.menus.scripts.init = {}

vars.menu.menus.scripts.hover.upgrade = function() {
    me.vars.JSON.data.price = me.vars.JSON.data.calculatePrice()
    var displayPrice = me.vars.JSON.data.price.toLocaleString()

    var ret = "You have " + vars.game.save.money.toLocaleString() + " Intergalactic Pounds | "
    var ret = ret + " Price: " + displayPrice + " Intergalactic Pounds | "
    var ret = ret + " Upgraded: " + vars.game.save.upgraded[me.vars.JSONID]
    var ret = ret + "/" + me.vars.JSON.data.maxUpgrade

    var ret = me.vars.JSON.data.englishName + " \n" + ret
    return ret
}
vars.menu.menus.scripts.click.upgrade = function() {
    me.loadTexture(me.vars.normalImg + "_Hover")

    me.vars.JSON.data.price = me.vars.JSON.data.calculatePrice(vars.game.save.upgraded[me.vars.JSONID])

    if (vars.game.save.money >= me.vars.JSON.data.price && (vars.game.save.upgraded[me.vars.JSONID] + 1) <= me.vars.JSON.data.maxUpgrade) {
        playSound("Upgrade")

        vars.game.save.money = vars.game.save.money - me.vars.JSON.data.price

        vars.game.save.upgrades[me.vars.JSON.data.upgradeID] = vars.game.save.upgrades[me.vars.JSON.data.upgradeID] + me.vars.JSON.data.upgradeAmount
        vars.game.save.upgraded[me.vars.JSONID] = vars.game.save.upgraded[me.vars.JSONID] + 1
    }
    else {
        playSound("Deny_Button")
    }
}
vars.menu.menus.scripts.init.upgrade = function() {
    me.scale.setTo(3)

    me.vars.normalImg = me.key
}
vars.menu.menus.scripts.hoverstart.upgrade = function() {
    me.loadTexture(me.vars.normalImg + "_Hover")
}
vars.menu.menus.scripts.hoverend.upgrade = function() {
    me.loadTexture(me.vars.normalImg)
}



vars.menu.menus.scripts.hover.upgradeSelect = function() {

    if (vars.game.save.upgraded[me.vars.JSONID] > 0) {
        if (vars.game.save.upgraded[me.vars.JSONID] == 2) {
            var ret = "You have " + vars.game.save.money.toLocaleString() + " Intergalactic Pounds | Selected"
        }
        else {
            var ret = "You have " + vars.game.save.money + " Intergalactic Pounds | Unlocked, but not selected"
        }
    }
    else {
        var displayPrice = me.vars.JSON.data.price.toLocaleString()

        var ret = "You have " + vars.game.save.money.toLocaleString() + " Intergalactic Pounds | "
        var ret = ret + " Price: " + displayPrice.toLocaleString() + " Intergalactic Pounds to unlock"
    }

    var ret = me.vars.JSON.data.englishName + " \n" + ret
    return ret
}
vars.menu.menus.scripts.click.upgradeSelect = function() {
    me.loadTexture(me.vars.normalImg + "_Hover")


    if (vars.game.save.money >= me.vars.JSON.data.price && (vars.game.save.upgraded[me.vars.JSONID] == 0)) {
        playSound("Upgrade")

        vars.game.save.money = vars.game.save.money - me.vars.JSON.data.price

        vars.game.save.upgrades[me.vars.JSON.data.upgradeID] = 1
        vars.game.save.upgraded[me.vars.JSONID] = 1
    }
    else {
        if (vars.game.save.upgraded[me.vars.JSONID] == 1) {
            var i = 0
            var ob = spriteCloneIds[me.cloneOf]
            for (i in ob) {
                var execute = Sprites[ob[i]]
                if (execute != undefined) {
                    if (execute.vars.JSON.data != undefined) {
                        if (execute.vars.JSON.data.upgradeType == "upgradeSelect") {
                            if (vars.game.save.upgraded[execute.vars.JSONID] > 1) {
                                vars.game.save.upgraded[execute.vars.JSONID] = 1 // Unselect it if it's unlocked.
                                vars.game.save.upgraded[me.vars.JSONID] = false
                            }
                        }
                    }
                }
            }

            vars.game.save.upgraded[me.vars.JSONID] = 2 // Now select this one.
            vars.game.save.upgrades[me.vars.JSONID] = true

            playSound("Click_Button")
        }
        else {
            playSound("Deny_Button")
        }
    }
}
vars.menu.menus.scripts.init.upgradeSelect = function() {
    me.scale.setTo(3)

    me.vars.normalImg = me.key
}
vars.menu.menus.scripts.hoverstart.upgradeSelect = function() {
    me.loadTexture(me.vars.normalImg + "_Hover")
}
vars.menu.menus.scripts.hoverend.upgradeSelect = function() {
    me.loadTexture(me.vars.normalImg)
}


vars.menu.menus.menus = {}
vars.menu.menus.JSON = {}

vars.menu.menus.JSON.upgrades = [
    {
        "text": "Planets",
        "content": [
            {
                "type": "image",
                "selected": 0,
                "imgs": [],
                "x": 400,
                "y": 220,
                "prefunc": function() {
                    var planetImages = []
                    var i = 0
                    for (i in vars.game.planets) {
                        planetImages[planetImages.length] = "Planet_"  + (JSON.parse(i) + 1)
                    }
                    me.vars.JSON.imgs = planetImages
                    me.loadTexture(me.vars.JSON.imgs[me.vars.JSON.selected])
                },
                "initfunc": function() {
                    me.width = 300
                    me.height = 300
                },
                "mainfunc": function() {

                }
            },
            {
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Arrow_Left"
                ],
                "x": 200,
                "y": 220,
                "initfunc": function() {
                    me.scale.setTo(10)

                    me.vars.normalImg = me.key
                },
                "mainfunc": function() {
                    me.x = me.vars.normalX - vars.menu.logoBob[0]
                },
                "clickfunc": function() {
                    me.loadTexture(me.vars.normalImg + "_Hover")

                    var plannetSprite = vars.menu.tabs[vars.menu.tab].content[0]
                    plannetSprite.selected--
                    if (plannetSprite.selected < 0) {
                        plannetSprite.selected = plannetSprite.imgs.length - 1
                    }
                },
                "hoverstart": function() {
                    me.loadTexture(me.vars.normalImg + "_Hover")
                },
                "hoverend": function() {
                    me.loadTexture(me.vars.normalImg)
                }
            },
            {
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Arrow_Right"
                ],
                "x": 600,
                "y": 220,
                "initfunc": function() {
                    me.scale.setTo(10)

                    me.vars.normalImg = me.key
                },
                "mainfunc": function() {
                    me.x =  me.vars.normalX + vars.menu.logoBob[0]
                },
                "clickfunc": function() {
                    me.loadTexture(me.vars.normalImg + "_Hover")

                    var plannetSprite = vars.menu.tabs[vars.menu.tab].content[0]
                    plannetSprite.selected++
                    if (plannetSprite.selected > plannetSprite.imgs.length - 1) {
                        plannetSprite.selected = 0
                    }
                },
                "hoverstart": function() {
                    me.loadTexture(me.vars.normalImg + "_Hover")
                },
                "hoverend": function() {
                    me.loadTexture(me.vars.normalImg)
                }
            },
            {
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Warp_Button"
                ],
                "x": 400,
                "y": 400,
                "hoverMessage": "Warp to plannet",
                "initfunc": function() {
                    me.scale.setTo(3)

                    me.vars.normalImg = me.key
                },
                "mainfunc": function() {},
                "clickfunc": function() {
                    me.loadTexture(me.vars.normalImg + "_Hover")

                    var plannetSprite = vars.menu.tabs[vars.menu.tab].content[0]
                    vars.game.currentPlanet = plannetSprite.selected

                    stopSound("Menu_Music")
                    beginFade(5, ["game"], 0)
                },
                "hoverstart": function() {
                    me.loadTexture(me.vars.normalImg + "_Hover")
                },
                "hoverend": function() {
                    me.loadTexture(me.vars.normalImg)
                }
            }
        ]
    },
    {
        "text": "Weapons",
        "content": [
            {
                "data": {
                    "startPrice": 500,
                    "upgradeID": "fireDamage",
                    "englishName": "Fire damage",
                    "upgraded": 0,
                    "maxUpgrade": 15,
                    "upgradeAmount": 1,
                    "calculatePrice": function() {
                        return Math.round(me.vars.JSON.data.startPrice * Math.pow(1.5, vars.game.save.upgraded[me.vars.JSONID]))
                    }
                },
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Upgrade_Attack_0"
                ],
                "x": 330,
                "y": 150,
                "hoverMessage": vars.menu.menus.scripts.hover.upgrade,
                "initfunc": vars.menu.menus.scripts.init.upgrade,
                "mainfunc": function() {},
                "clickfunc": vars.menu.menus.scripts.click.upgrade,
                "hoverstart": vars.menu.menus.scripts.hoverstart.upgrade,
                "hoverend": vars.menu.menus.scripts.hoverend.upgrade
            },
            // Fire damage
            {
                "data": {
                    "startPrice": 300,
                    "upgradeID": "fireRate",
                    "englishName": "Fire rate",
                    "upgraded": 0,
                    "maxUpgrade": 25,
                    "upgradeAmount": -1,
                    "calculatePrice": function() {
                        return Math.round(me.vars.JSON.data.startPrice * Math.pow(1.2, vars.game.save.upgraded[me.vars.JSONID]))
                    }
                },
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Upgrade_Attack_1"
                ],
                "x": 400,
                "y": 150,
                "hoverMessage": vars.menu.menus.scripts.hover.upgrade,
                "initfunc": vars.menu.menus.scripts.init.upgrade,
                "mainfunc": function() {},
                "clickfunc": vars.menu.menus.scripts.click.upgrade,
                "hoverstart": vars.menu.menus.scripts.hoverstart.upgrade,
                "hoverend": vars.menu.menus.scripts.hoverend.upgrade
            },
            // Fire speed
            {
                "data": {
                    "startPrice": 2000,
                    "upgradeID": "homing",
                    "englishName": "Homing",
                    "upgraded": 0,
                    "maxUpgrade": 20,
                    "upgradeAmount": 10,
                    "calculatePrice": function() {
                        return Math.round(me.vars.JSON.data.startPrice * Math.pow(1.1, vars.game.save.upgraded[me.vars.JSONID]))
                    }
                },
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Upgrade_Attack_2"
                ],
                "x": 470,
                "y": 150,
                "hoverMessage": vars.menu.menus.scripts.hover.upgrade,
                "initfunc": vars.menu.menus.scripts.init.upgrade,
                "mainfunc": function() {},
                "clickfunc": vars.menu.menus.scripts.click.upgrade,
                "hoverstart": vars.menu.menus.scripts.hoverstart.upgrade,
                "hoverend": vars.menu.menus.scripts.hoverend.upgrade
            },
            // Homing

            // Weapon systems

            {
                "data": {
                    "price": 0,
                    "upgradeID": "bullets",
                    "englishName": "Bullets",
                    "upgradeType": "upgradeSelect"
                },
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Upgrade_Attack_3"
                ],
                "x": 330,
                "y": 250,
                "hoverMessage": vars.menu.menus.scripts.hover.upgradeSelect,
                "initfunc": vars.menu.menus.scripts.init.upgradeSelect,
                "mainfunc": function() {},
                "clickfunc": vars.menu.menus.scripts.click.upgradeSelect,
                "hoverstart": vars.menu.menus.scripts.hoverstart.upgradeSelect,
                "hoverend": vars.menu.menus.scripts.hoverend.upgradeSelect
            },
            // Bullets
            {
                "data": {
                    "price": 50000,
                    "upgradeID": "lasers",
                    "englishName": "Lasers",
                    "upgradeType": "upgradeSelect"
                },
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Upgrade_Attack_4"
                ],
                "x": 400,
                "y": 250,
                "hoverMessage": vars.menu.menus.scripts.hover.upgradeSelect,
                "initfunc": vars.menu.menus.scripts.init.upgradeSelect,
                "mainfunc": function() {},
                "clickfunc": vars.menu.menus.scripts.click.upgradeSelect,
                "hoverstart": vars.menu.menus.scripts.hoverstart.upgradeSelect,
                "hoverend": vars.menu.menus.scripts.hoverend.upgradeSelect
            },
            // Lasers
            {
                "data": {
                    "price": 500000,
                    "upgradeID": "plasma",
                    "englishName": "Plasma",
                    "upgradeType": "upgradeSelect"
                },
                "type": "button",
                "selected": 0,
                "imgs": [
                    "Upgrade_Attack_5"
                ],
                "x": 470,
                "y": 250,
                "hoverMessage": vars.menu.menus.scripts.hover.upgradeSelect,
                "initfunc": vars.menu.menus.scripts.init.upgradeSelect,
                "mainfunc": function() {},
                "clickfunc": vars.menu.menus.scripts.click.upgradeSelect,
                "hoverstart": vars.menu.menus.scripts.hoverstart.upgradeSelect,
                "hoverend": vars.menu.menus.scripts.hoverend.upgradeSelect
            }
            // Plasma
        ]
    },
    {
        "text": "Defence"
    }
]
