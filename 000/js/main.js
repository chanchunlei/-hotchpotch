(function () {
    var b = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        a = "undefined" !== typeof module && module.exports,
        d = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        c = function () {
            for (var a, d = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], c = 0, e = d.length, f = {}; c < e; c++)
                if ((a = d[c]) && a[1] in b) {
                    for (c = 0; c < a.length; c++) f[d[0][c]] =
                        a[c];
                    return f
                }
            return !1
        }(),
        e = {
            change: c.fullscreenchange,
            error: c.fullscreenerror
        },
        f = {
            request: function (a) {
                var e = c.requestFullscreen;
                a = a || b.documentElement;
                if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) a[e]();
                else a[e](d && Element.ALLOW_KEYBOARD_INPUT)
            },
            exit: function () {
                b[c.exitFullscreen]()
            },
            toggle: function (a) {
                this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function (a) {
                this.on("change", a)
            },
            onerror: function (a) {
                this.on("error", a)
            },
            on: function (a, d) {
                var c = e[a];
                c && b.addEventListener(c, d, !1)
            },
            off: function (a,
                d) {
                var c = e[a];
                c && b.removeEventListener(c, d, !1)
            },
            raw: c
        };
    c ? (Object.defineProperties(f, {
        isFullscreen: {
            get: function () {
                return !!b[c.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function () {
                return b[c.fullscreenElement]
            }
        },
        enabled: {
            enumerable: !0,
            get: function () {
                return !!b[c.fullscreenEnabled]
            }
        }
    }), a ? module.exports = f : window.screenfull = f) : a ? module.exports = !1 : window.screenfull = !1
})();

function extractHostname(b) {
    b = -1 < b.indexOf("://") ? b.split("/")[2] : b.split("/")[0];
    b = b.split(":")[0];
    return b = b.split("?")[0]
}

function extractRootDomain(b) {
    b = extractHostname(b);
    var a = b.split("."),
        d = a.length;
    2 < d && (b = ("com" === a[d - 2] || "net" === a[d - 2] || "co" === a[d - 2]) && 3 <= d ? a[d - 3] + "." + a[d - 2] + "." + a[d - 1] : a[d - 2] + "." + a[d - 1]);
    return b
}
var getClosestTop = function () {
        var b = window,
            a = !1;
        try {
            for (; b.parent.document !== b.document;)
                if (b.parent.document) b = b.parent;
                else {
                    a = !0;
                    break
                }
        } catch (d) {
            a = !0
        }
        return {
            topFrame: b,
            err: a
        }
    },
    getBestPageUrl = function (b) {
        var a = b.topFrame,
            d = "";
        if (b.err) try {
            try {
                d = window.top.location.href
            } catch (e) {
                var c = window.location.ancestorOrigins;
                d = c[c.length - 1]
            }
        } catch (e) {
            d = a.document.referrer
        } else d = a.location.href;
        return d
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function showMoreGames() {
    0 < jQuery("#more-games-button").length && jQuery("#more-games-button").fadeIn()
}

function hideMoreGames() {
    0 < jQuery("#more-games-button").length && jQuery("#more-games-button").fadeOut()
}

function checkMoreGames(b) {
    var a = getGames(extractRootDomain(PAGE_URL));
    0 !== a.length && (jQuery("body").append('<div id="more-games-button"></div>'), jQuery("#more-games-button").on("click", function () {
        var b = "<div class='more-games-dialog-wrapper'><div class='more-games-dialog-block'></div><div class='more-games-dialog-content'><div class='more-games-dialog-scrolling'>";
        for (var c = 0; c < a.length; c++) b += "<a target='_blank' class='more-games-dialog-tile' href='" + a[c].url + "'>", b += "<img src='" + a[c].img + "' />",
            b += "</a>";
        b += "</div><div class='embed-and-earn'><p><a href='http://gamedistribution.com/publishers/' target='_blank'>Earn</a> embed <a target='_blank' href='http://gamedistribution.com/Gamelist/Code-This%20Lab%20srl/'>our games</a>!</p></div><a href='http://gamedistribution.com/Gamelist/Code-This%20Lab%20srl/'><div class='more-games-dialog-logo'></div></a></div><div class='more-games-dialog-exit'></div></div>";
        jQuery("body").append(b);
        setTimeout(function () {
            jQuery(".more-games-dialog-block").addClass("more-games-dialog-block-show");
            setTimeout(function () {
                jQuery(".more-games-dialog-content").addClass("more-games-dialog-content-show");
                jQuery(".more-games-dialog-exit").addClass("more-games-dialog-exit-show")
            }, 100)
        }, 100)
    }), jQuery("#more-games-button").fadeIn())
}
$(document).ready(function () {
    jQuery(document).on("click", ".more-games-dialog-exit", function () {
        jQuery(".more-games-dialog-content").removeClass("more-games-dialog-content-show");
        jQuery(".more-games-dialog-exit").removeClass("more-games-dialog-exit-show");
        setTimeout(function () {
            jQuery(".more-games-dialog-block").removeClass("more-games-dialog-block-show");
            setTimeout(function () {
                jQuery(".more-games-dialog-wrapper").remove()
            }, 500)
        }, 100)
    })
});

function getGames(b) {
    var a = [];
    switch (b) {
        case "codethislab.com":
        case "gamedistribution.com":
            a.push({
                img: "http://img.gamedistribution.com/8f2d0e8b584d4eb5930a5158d08d163b.jpg",
                url: "http://gamedistribution.com/Games/Shoot-'Em-Up/Dead-City.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/57acee2e2934416ea24a8c1c5a9ed8ea.jpg",
                url: "http://gamedistribution.com/Games/Shooter/King-Bacon-VS-Vegans.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/fb59e2712b664e3d8c4d7decfcf419c9.jpg",
                url: "http://gamedistribution.com/Games/Action/Cyclops-Ruins.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/4bf984a368a64b11a2748da4c66bcaa2.jpg",
                url: "http://gamedistribution.com/Games/Board/Mastermind.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/4d081fdaff874976a47e3ec80ad9a393.jpg",
                url: "http://gamedistribution.com/Games/Soccer/Penalty-Kicks.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/0f38da229ce44294b5aeaa52771b1608.jpg",
                url: "http://gamedistribution.com/Games/Soccer/Foosball.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/28aad67b0b39407c93b372e83cb8cc88.jpg",
                url: "http://gamedistribution.com/Games/Racing/Greyhound-Racing.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/902ee2d7bef446d79fde28bb28cd0f01.jpg",
                url: "http://gamedistribution.com/Games/Match-3/Frogtastic.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/7b35c3ce549b408abe37f77990d7f6fa.jpg",
                url: "http://gamedistribution.com/Games/Board/Nine-Mens-Morris.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/a4c67fbbc9bb4d70a26a85a91e5d12cc.jpg",
                url: "http://gamedistribution.com/Games/Classic/Neon-Pong.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/3ab6d797bf8340139483367ac2dbf76b.jpg",
                url: "http://gamedistribution.com/Games/Racing/Gear-Madness.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/c2820a1635844cff8c6c9b2bf0771df0.jpg",
                url: "http://gamedistribution.com/Games/Addicting/2048--Cuteness-Edition.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/d96dc07738f248c49ae51c61facd4286.jpg",
                url: "http://gamedistribution.com/Games/1-Player/Classic-Backgammon.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/f360e5b43093401ca1b9a6d54105ffd2.jpg",
                url: "http://gamedistribution.com/Games/Golf/Minigolf-World.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/4ba63b68f15a4ecbb21eef429655dcc0.jpg",
                url: "http://gamedistribution.com/Games/Board/Domino-Block.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/9881ac54b4ac48ad8b6fd92232e5ed4f.jpg",
                url: "http://gamedistribution.com/Games/Jigsaw-Puzzle/Jigsaw-Deluxe.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/b2a3398e327b4f6da665759d6730aab4.jpg",
                url: "http://gamedistribution.com/Games/Chess/Master-Chess.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/a82bfcc90a8548a3976b0b2d13dd37dd.jpg",
                url: "http://gamedistribution.com/Games/Puzzle/Free-Words.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/d7b10d9e32844525a0bfa1fef7324895.jpg",
                url: "http://gamedistribution.com/Games/Board/Connect-4.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/36b470b1f113447696c2704c6e1bd0c2.jpg",
                url: "http://gamedistribution.com/Games/Skill/Snake-and-Blocks.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/e0d570df45e146899b986770297c0210.jpg",
                url: "http://gamedistribution.com/Games/Board/Master-Checkers.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/2cea016521ab452692a0141a40dfde9b.jpg",
                url: "http://gamedistribution.com/Games/Sports/Swimming-Pro.html"
            });
            a.push({
                img: "http://img.gamedistribution.com/3be284e237de4c7ba3a9e5cac0fd6ee3.jpg",
                url: "http://gamedistribution.com/Games/Soccer/Freekick-Training.html"
            });
            break;
        case "a10.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.a10.com/popular-games/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.a10.com/action-games/swimming-pro"
            });
            break;
        case "10000paixnidia.gr":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.10000paixnidia.gr/paixnidia/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.10000paixnidia.gr/paixnidia/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.10000paixnidia.gr/paixnidia/minigolf-world"
            });
            break;
        case "10001games.fr":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.10001games.fr/jeu/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.10001games.fr/jeu/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.10001games.fr/jeu/minigolf-world"
            });
            break;
        case "1001paixnidia.eu":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.1001paixnidia.eu/paixnidia/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.1001paixnidia.eu/paixnidia/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.1001paixnidia.eu/paixnidia/minigolf-world"
            });
            break;
        case "101games.it":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.101games.it/giochi/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.101games.it/giochi/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.101games.it/giochi/minigolf-world"
            });
            break;
        case "agame.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.agame.com/game/snake-and-blocks/"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.agame.com/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.agame.com/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.agame.com/game/master-checkers"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.agame.com/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.agame.com/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.agame.com/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.agame.com/game/jigsaw-deluxe"
            });
            break;
        case "bebekoyunu.com.tr":
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/cadde-yarisi-cilginlari-4582.jpg",
                url: "http://bebekoyunu.com.tr/cadde-yarisi-cilginlari-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/domino-4525.jpg",
                url: "http://bebekoyunu.com.tr/domino-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/2-kisilik-satranc-4509.jpg",
                url: "http://www.bebekoyunu.com.tr/2-kisilik-satranc-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/tavla-4519.jpg",
                url: "http://bebekoyunu.com.tr/2-kisilik-tavla-oyna.html"
            });
            a.push({
                img: "http://m.bebekoyunu.com.tr/img/s/matematik-yilani-2-4505.jpg",
                url: "http://www.bebekoyunu.com.tr/matematik-yilani-2-oyna.html"
            });
            break;
        case "bgames.com":
            a.push({
                img: "http://static.bgames.com/games/assets/icons/3/112243/89539/bggb-380662.jpg",
                url: "http://www.bgames.com/sport-games/minigolf_world/"
            });
            break;
        case "clickjogos.com.br":
            a.push({
                img: "http://img2.clickjogos.com.br/dl/3/3294ff9b92437bc8c3dae81514e8895b/thumb.png?1504543080",
                url: "http://www.clickjogos.com.br/jogos/penalty-kicks/"
            });
            a.push({
                img: "http://img2.clickjogos.com.br/dl/b/be63e6dca8c799105962f9f110090fad/thumb.png?1504125627",
                url: "http://www.clickjogos.com.br/jogos/gear-madness/"
            });
            a.push({
                img: "http://img5.clickjogos.com.br/dl/b/bd6a0ccee7cba8dd6c1f2fbe611654d7/thumb.png?1504108745",
                url: "http://www.clickjogos.com.br/jogos/freekick-training/"
            });
            break;
        case "cool77.com":
            a.push({
                img: "http://cool77.com/img/dead-city.jpg",
                url: "http://cool77.com/game/816-dead-city"
            });
            a.push({
                img: "http://cool77.com/img/king-bacon-vs-vegans.jpg",
                url: "http://cool77.com/game/817-king-bacon-vs-vegans"
            });
            break;
        case "flashgames.ru":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.flashgames.ru/igra/soberi-4-klassika"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.flashgames.ru/igra/zmeia-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.flashgames.ru/igra/chempion-po-plavaniiu"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.flashgames.ru/igra/master-shashek"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.flashgames.ru/igra/blok-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.flashgames.ru/igra/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.flashgames.ru/igra/mir-svobodnykh-slov"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.flashgames.ru/igra/pazl-deliuks"
            });
            break;
        case "frivjogosonline.com.br":
            a.push({
                img: "http://cdn.frivjogosonline.com.br/wp-content/files/08/jpg/1f02a80db7d63ff04a6986023d3a0b60-120x100.jpg",
                url: "http://www.frivjogosonline.com.br/jogo/freekick-training.html"
            });
            break;
        case "funnygames.be":
            a.push({
                img: "http://assets.funnygames.be/games/assets/promos/3/112243/89539/185x145-380649.jpg",
                url: "http://www.funnygames.be/spel/minigolf.html"
            });
            break;
        case "funnygames.nl":
            a.push({
                img: "http://assets.funnygames.nl/games/assets/promos/7/19057/72449/185x145-380370.jpg",
                url: "http://www.funnygames.nl/spel/vier_op_een_rij.html"
            });
            a.push({
                img: "http://assets.funnygames.nl/games/assets/promos/2/112582/90773/185x145-380398.jpg?r=1502108077054",
                url: "http://www.funnygames.nl/spel/free_words.html"
            });
            break;
        case "funnygames.us":
            a.push({
                img: "http://assets.funnygames.us/games/assets/screenshots/3/112243/89539/minigolf-world-pss-380643.jpg",
                url: "http://www.funnygames.us/game/minigolf_world.html"
            });
            a.push({
                img: "http://assets.funnygames.us/games/assets/screenshots/7/19057/72449/connect-4-pss-225028.jpg?r=1502092710859",
                url: "http://www.funnygames.us/game/connect_4.html"
            });
            break;
        case "game-game.com":
            a.push({
                img: "http://cdn2.game-game.com.ua/gamesimg/180909.jpg",
                url: "http://www.game-game.com.ua/180909/"
            });
            a.push({
                img: "http://cdn2.game-game.com.ua/gamesimg/180384_big.jpg",
                url: "http://game-game.com/180384/"
            });
            break;
        case "game-game.com.ua":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.com/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://www.game-game.com.ua/180384/"
            });
            break;
        case "game-game.kz":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.kz/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://game-game.kz/180384/"
            });
            break;
        case "game-game.lv":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.lv/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://game-game.lv/180384/"
            });
            break;
        case "game-game.ma":
            a.push({
                img: "http://cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
                url: "http://game-game.ma/180909/"
            });
            a.push({
                img: "http://www.game-game.com.ua/gamesimg/180384.jpg",
                url: "http://game-game.ma/180384/"
            });
            break;
        case "games.co.id":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.games.co.id/permainan_/hubungkan-4-klasik"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.games.co.id/permainan_/ular-dan-balok"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.games.co.id/permainan_/renang-profesional"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.games.co.id/permainan_/master-checker"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.games.co.id/permainan_/balok-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.games.co.id/permainan_/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.games.co.id/permainan_/kata-kata-bebas"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.games.co.id/permainan_/puzzle-jigsaw-deluks"
            });
            break;
        case "games.co.uk":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.games.co.uk/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.games.co.uk/game/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.games.co.uk/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.games.co.uk/game/master-checkers"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.games.co.uk/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.games.co.uk/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.games.co.uk/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.games.co.uk/game/jigsaw-deluxe"
            });
            break;
        case "games.do":
            a.push({
                img: "http://media.bfgfile.com/images/33_2121d.jpg",
                url: "http://www.games.do/games/connect_4"
            });
            a.push({
                img: "http://media.bfgfile.com/images/35_49441.jpg",
                url: "http://www.games.do/games/frogtastic-mobile"
            });
            a.push({
                img: "http://media.bfgfile.com/images/32_49279d.jpg",
                url: "http://www.games.do/games/minigolf-world"
            });
            break;
        case "gamesgames.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.gamesgames.com/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.gamesgames.com/game/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.gamesgames.com/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gamesgames.com/game/master-checkers"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.gamesgames.com/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.gamesgames.com/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.gamesgames.com/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gamesgames.com/game/jigsaw-deluxe"
            });
            break;
        case "gameshed.com":
            a.push({
                img: "http://games.gameshed.com/dead-city.jpg",
                url: "http://www.gameshed.com/Zombie-Games/Dead-City/"
            });
            break;
        case "games.gr":
            a.push({
                img: "http://media.games.gr/images/32_49279d.jpg",
                url: "http://www.games.gr/search/minigolf/"
            });
            a.push({
                img: "http://media.games.gr/images/33_2121d.jpg",
                url: "http://www.games.gr/paixnidia/connect_4"
            });
            a.push({
                img: "http://media.games.gr/images/35_49441.jpg",
                url: "http://www.games.gr/paixnidia/frogtastic-mobile"
            });
            break;
        case "gioco.it":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.gioco.it/gioco/connect-4-classico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.gioco.it/gioco/blocchi-e-serpenti"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.gioco.it/gioco/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gioco.it/gioco/dama-royale"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.gioco.it/gioco/dominoblock"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.gioco.it/gioco/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.gioco.it/gioco/parole-in-liberta"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gioco.it/gioco/puzzle-deluxe"
            });
            break;
        case "giochi.it":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.giochi.it/gioco/connect-4-classico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.giochi.it/gioco/blocchi-e-serpenti"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.giochi.it/gioco/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.giochi.it/gioco/dama-royale"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.giochi.it/gioco/dominoblock"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.giochi.it/gioco/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.giochi.it/gioco/parole-in-liberta"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.giochi.it/gioco/puzzle-deluxe"
            });
            break;
        case "giochigratisonline.it":
            a.push({
                img: "http://www.giochigratisonline.it/giochi-online/giochi-vari/snake-and-blocks/snake.jpg",
                url: "http://www.giochigratisonline.it/giochi-online/giochi-vari/snake-and-blocks/"
            });
            break;
        case "girlsgogames.co.uk":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.girlsgogames.co.uk/game/connect-4-classic"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.girlsgogames.co.uk/game/snake-and-blocks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.girlsgogames.co.uk/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.girlsgogames.co.uk/game/free-words"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.girlsgogames.fr/jeu/puzzle-de-luxe"
            });
            break;
        case "girlsgogames.fr":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.girlsgogames.fr/jeu/puzzle-de-luxe"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.girlsgogames.fr/jeu/mots-gratuits"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.girlsgogames.fr/jeu/puissance-4-classique"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.girlsgogames.fr/jeu/serpent-vs-blocs-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.girlsgogames.fr/jeu/pro-de-la-natation"
            });
            break;
        case "girlsgogames.ru":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.girlsgogames.ru/igra/pazl-deliuks"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.girlsgogames.ru/igra/soberi-4-klassika"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.girlsgogames.ru/igra/mir-svobodnykh-slov"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.girlsgogames.ru/igra/zmeia-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.girlsgogames.ru/igra/chempion-po-plavaniiu"
            });
            break;
        case "gratisspil.dk":
            a.push({
                img: "http://www.gratisspil.dk/9394/onlineGameImages/w140/1504259771nmm.png",
                url: "http://www.gratisspil.dk/onlineGame/games/play.php?categoryID=7&id=6224#commentsPaginatorPage=1"
            });
            break;
        case "gry.pl":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.gry.pl/gra/weze-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.gry.pl/gra/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.gry.pl/gra/poacz-4-wersja-klasyczna"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gry.pl/gra/mistrzowskie-warcaby"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.gry.pl/gra/mistrzowskie-warcaby"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.gry.pl/gra/zagraj-w-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.gry.pl/gra/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.gry.pl/gra/darmowe-sowa"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gry.pl/gra/puzzle-luksusowe"
            });
            break;
        case "hierspielen.com":
            a.push({
                img: "http://www.hierspielen.com/img/games/200x150/23088.jpg",
                url: "http://www.hierspielen.com/spiel/frogtastic.html"
            });
            break;
        case "juegos.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.juegos.com/juego/conecta-4-clasico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.juegos.com/juego/serpientes-y-bloques"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.juegos.com/juego/nadador-profesional"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.juegos.com/juego/damas-maestras"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.juegos.com/juego/bloques-de-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.juegos.com/juego/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.juegos.com/juego/palabras-libres"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.juegos.com/juego/rompecabezas-de-lujo"
            });
            break;
        case "jeja.pl":
            a.push({
                img: "http://pobierak.jeja.pl/games_thumb/c/d/0/36215_200x120.jpg?1504101426",
                url: "http://www.gry.jeja.pl/36215,trening-rzutow-wolnych.html"
            });
            a.push({
                img: "http://pobierak.jeja.pl/games_thumb//3/5/1/36243_200x120.jpg?1504797259",
                url: "http://www.gry.jeja.pl/36243,budowa-wiezy.html"
            });
            break;
        case "jetztspielen.de":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.jetztspielen.de/spiel/vier-gewinnt-klassisch"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.jetztspielen.de/spiel/schlange-und-blocke"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.jetztspielen.de/spiel/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.jetztspielen.de/spiel/meister-in-dame"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.jetztspielen.de/spiel/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.jetztspielen.de/spiel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.jetztspielen.de/spiel/freie-worter"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.jetztspielen.de/spiel/puzzle-deluxe"
            });
            break;
        case "jeu.fr":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.jeu.fr/jeu/puissance-4-classique"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.jeu.fr/jeu/serpent-vs-blocs-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.jeu.fr/jeu/pro-de-la-natation"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.jeu.fr/jeu/maitre-aux-echecs"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.jeu.fr/jeu/bloc-de-dominos"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.jeu.fr/jeu/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.jeu.fr/jeu/mots-gratuits"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.jeu.fr/jeu/puzzle-de-luxe"
            });
            break;
        case "jeux.fr":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.jeux.fr/jeu/puissance-4-classique"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.jeux.fr/jeu/serpent-vs-blocs-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.jeux.fr/jeu/pro-de-la-natation"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.jeux.fr/jeu/maitre-aux-echecs"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.jeux.fr/jeu/bloc-de-dominos"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.jeux.fr/jeu/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.jeux.fr/jeu/mots-gratuits"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.jeux.fr/jeu/puzzle-de-luxe"
            });
            break;
        case "k2t2.com":
            a.push({
                img: "http://k2t2.com/content/upload/games/images/minigolf-world.png",
                url: "http://k2t2.com/minigolf-world/"
            });
            a.push({
                img: "http://k2t2.com/content/upload/games/images/snake-and-blocks.png",
                url: "http://k2t2.com/snake-and-blocks/"
            });
            break;
        case "klikarnia.pl":
            a.push({
                img: "http://klikarnia.pl/gryonline/frogtastic.jpg",
                url: "http://klikarnia.pl/frogtastic"
            });
            break;
        case "igry-multiki.ru":
            a.push({
                img: "http://www.igry-multiki.ru/contents/image/games/game/220x165/shashki-na-planshet-igry-b.jpg",
                url: "http://www.igry-multiki.ru/igra-shashki-na-planshet/"
            });
            a.push({
                img: "http://www.igry-multiki.ru/contents/image/games/game/220x165/shahmaty-na-planshet-igry-b.jpg",
                url: "http://www.igry-multiki.ru/igra-shahmaty-na-planshet/"
            });
            break;
        case "mousebreaker.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.mousebreaker.com/game/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.mousebreaker.com/game/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.mousebreaker.com/game/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.mousebreaker.com/game/free-words"
            });
            break;
        case "minioyun.org":
            a.push({
                img: "http://www.minioyun.org/img/baglanti-4-klasik.JPG",
                url: "http://www.minioyun.org/baglanti-4-klasik.html"
            });
            break;
        case "ojogos.com.br":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.ojogos.com.br/jogo/connect-4-classico"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.ojogos.com.br/jogo/cobra-e-blocos"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.ojogos.com.br/jogo/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.ojogos.com.br/jogo/maioral-das-damas"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.ojogos.com.br/jogo/bloco-de-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.ojogos.com.br/jogo/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.ojogos.com.br/jogo/palavras-livres"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.ojogos.com.br/jogo/quebra-cabecas-de-luxo"
            });
            break;
        case "ourgames.ru":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.ourgames.ru/igra/soberi-4-klassika"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.ourgames.ru/igra/zmeia-i-bloki"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.ourgames.ru/igra/chempion-po-plavaniiu"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.ourgames.ru/igra/master-shashek"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.ourgames.ru/igra/blok-domino"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.ourgames.ru/igra/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.ourgames.ru/igra/mir-svobodnykh-slov"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.ourgames.ru/igra/pazl-deliuks"
            });
            break;
        case "oyungemisi.com":
            a.push({
                img: "http://static.oyungemisi.com/games/assets/icons/3/112243/89539/96x96-380646.jpg?r=1502194273127",
                url: "http://oyungemisi.com/minigolf-world-oyun/"
            });
            break;
        case "pacogames.com":
            a.push({
                img: "https://data.pacogames.com/images/230x172/frogtastic.jpg",
                url: "http://www.pacogames.com/logic/frogtastic"
            });
            break;
        case "quicksave.su":
            a.push({
                img: "http://st.manamonster.com/images/games/1/11945-jigsaw-deluxe-300x169.jpg",
                url: "http://quicksave.su/games/11945-jigsaw-deluxe"
            });
            break;
        case "raketka.cz":
            a.push({
                img: "http://www.raketka.cz/gamedata/images/27865_172_152.png",
                url: "http://www.raketka.cz/h/neon-pong"
            });
            a.push({
                img: "http://www.raketka.cz/gamedata/images/27862_172_152.png",
                url: "http://www.raketka.cz/h/nine-mens-morris"
            });
            break;
        case "silvergames.com":
            a.push({
                img: "http://i1.silvergames.com/p/b/minigolf-world.png",
                url: "http://www.silvergames.com/en/minigolf-world"
            });
            a.push({
                img: "http://i2.silvergames.com/p/a/snake-and-blocks.png",
                url: "http://www.silvergames.com/en/snake-and-blocks"
            });
            break;
        case "spel.nl":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spel.nl/spel/klassieke-4-op-een-rij"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spel.nl/spel/slang-en-blokken"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spel.nl/spel/zwemkampioen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spel.nl/spel/dammeester"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spel.nl/spel/dominostenen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spel.nl/spel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.gioco.it/gioco/puzzle-deluxe"
            });
            break;
        case "spela.se":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spela.se/spel_/lanka-ihop-4-klassisk"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spela.se/spel_/orm-och-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spela.se/spel_/simmarproffs"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spela.se/spel_/damspelmastare"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spela.se/spel_/dominoblock"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spela.se/spel_/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.spela.se/spel_/gratis-ord"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.spela.se/spel_/pussel-med-vilda-djur"
            });
            break;
        case "spele.be":
            a.push({
                img: "http://static.spele.be/games/assets/screenshots/3/112243/89539/222x140-380645.jpg",
                url: "http://spele.be/minigolf-world-spel/"
            });
            a.push({
                img: "http://static.spele.be/games/assets/screenshots/9/68979/41390/222x140-85104.jpg",
                url: "http://spele.be/connect-4-spel/"
            });
            break;
        case "spele.nl":
            a.push({
                img: "http://spele.nl/minigolf-world-spel/",
                url: "http://spele.nl/connect-4-spel/"
            });
            a.push({
                img: "http://static.spele.nl/games/assets/icons/3/112243/89539/96x96-380646.jpg",
                url: "http://spele.nl/minigolf-world-spel/"
            });
            break;
        case "spelletjes.nl":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spelletjes.nl/spel/slang-en-blokken"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spelletjes.nl/spel/klassieke-4-op-een-rij"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spelletjes.nl/spel/zwemkampioen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spelletjes.nl/spel/dammeester"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spelletjes.nl/spel/dominostenen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spelletjes.nl/spel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.spelletjes.nl/spel/woorden-vormen"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.spelletjes.nl/spel/puzzel-deluxe"
            });
            break;
        case "spielen.es":
            a.push({
                img: "http://i2.spielen.es/p/a/minigolf-world.png",
                url: "http://www.spielen.es/de/minigolf-world"
            });
            a.push({
                img: "http://i2.spielen.es/p/a/snake-and-blocks.png",
                url: "http://www.spielen.es/de/snake-and-blocks"
            });
            break;
        case "spielen.com":
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
                url: "http://www.spielen.com/spiel/vier-gewinnt-klassisch"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
                url: "http://www.spielen.com/spiel/schlange-und-blocke"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
                url: "http://www.spielen.com/spiel/swimming-pro"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
                url: "http://www.spielen.com/spiel/meister-in-dame"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
                url: "http://www.spielen.com/spiel/domino-block"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
                url: "http://www.spielen.com/spiel/classic-backgammon-"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
                url: "http://www.spielen.com/spiel/freie-worter"
            });
            a.push({
                img: "http://files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
                url: "http://www.spielen.com/spiel/puzzle-deluxe"
            });
            break;
        case "spielert.de":
            a.push({
                img: "http://spielert.de/uploads/thumbs/nine-men-s-morris-online-mills-game.jpg",
                url: "http://spielert.de/denk/Nine-Men-s-Morris-Online-Mills-Game"
            });
            break;
        case "superhry.cz":
            a.push({
                img: "http://data6.superhry.cz/cnt_img/014/14758_340.jpg",
                url: "http://www.superhry.cz/hra/14758-gear-madness"
            });
            break;
        case "yepi.com":
            a.push({
                img: "http://static0.yepi.com/system/static/thumbs/tile_thumb/1900/thumb150_57acee2e2934416ea24a8c1c5a9ed8ea.jpg?1504529576",
                url: "http://yepi.com/games/king-bacon-vs-vegans"
            });
            break;
        case "yo-yoo.co.il":
            a.push({
                img: "http://www.yo-yoo.co.il/uploads/chesssonline.jpg",
                url: "http://games.yo-yoo.co.il/games_play.php?game=5139"
            });
            a.push({
                img: "http://www.yo-yoo.co.il/uploads/4ineorafa.png",
                url: "http://games.yo-yoo.co.il/games_play.php?game=5140"
            });
            a.push({
                img: "http://www.yo-yoo.co.il/uploads/sheshshsobae.jpg",
                url: "http://games.yo-yoo.co.il/games_play.php?game=5147"
            });
            break;
        case "zebest-3000.com":
            a.push({
                img: "http://cdn.zebest-3000.com/img/general/games/200x150/23088.jpg",
                url: "http://www.zebest-3000.com/jeux/jeu-23088.html"
            })
    }
    return a
}
var s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX, s_iOffsetY;
(function (b) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))
})(navigator.userAgent ||
    navigator.vendor || window.opera);
$(window).resize(function () {
    sizeHandler()
});

function NotImplementedError(b) {
    this.name = "NotImplementedError";
    this.message = b || ""
}
NotImplementedError.prototype = Error.prototype;

function error(b) {
    throw {
        name: "NotImplementedError",
        message: b
    };
}

function trace(b) {
    console.log(b)
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    sizeHandler()
}

function ifArrayContainsValue(b, a) {
    for (var d = 0; d < b.length; d++)
        if (b[d] === a) return !0;
    return !1
}

function getSize(b) {
    var a = b.toLowerCase(),
        d = window.document,
        c = d.documentElement;
    if (void 0 === window["inner" + b]) b = c["client" + b];
    else if (window["inner" + b] != c["client" + b]) {
        var e = d.createElement("body");
        e.id = "vpw-test-b";
        e.style.cssText = "overflow:scroll";
        var f = d.createElement("div");
        f.id = "vpw-test-d";
        f.style.cssText = "position:absolute;top:-1000px";
        f.innerHTML = "<style>@media(" + a + ":" + c["client" + b] + "px){body#vpw-test-b div#vpw-test-d{" + a + ":7px!important}}</style>";
        e.appendChild(f);
        c.insertBefore(e, d.head);
        b = 7 == f["offset" + b] ? c["client" + b] : window["inner" + b];
        c.removeChild(e)
    } else b = window["inner" + b];
    return b
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var b = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var a = getSize("Width");
        _checkOrientation(a, b);
        var d = Math.min(b / CANVAS_HEIGHT, a / CANVAS_WIDTH);
        s_iScaleFactor = d;
        var c = CANVAS_WIDTH * d;
        d *= CANVAS_HEIGHT;
        if (d < b) {
            var e = b - d;
            d += e;
            c += CANVAS_WIDTH / CANVAS_HEIGHT * e
        } else c < a && (e = a - c, c += e, d += CANVAS_HEIGHT / CANVAS_WIDTH * e);
        e = b / 2 - d / 2;
        var f = a / 2 - c / 2,
            h = CANVAS_WIDTH / c;
        if (f * h < -EDGEBOARD_X || e * h < -EDGEBOARD_Y) d = Math.min(b /
            (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), a / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), c = CANVAS_WIDTH * d, d *= CANVAS_HEIGHT, e = (b - d) / 2, f = (a - c) / 2, h = CANVAS_WIDTH / c;
        s_iOffsetX = Math.floor(-1 * f * h);
        s_iOffsetY = Math.floor(-1 * e * h);
        0 <= e && (s_iOffsetY = 0);
        0 <= f && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = Math.floor(2 * c), s_oStage.canvas.height = Math.floor(2 *
            d), canvas.style.width = Math.floor(c) + "px", canvas.style.height = Math.floor(d) + "px", s_oStage.scaleX = s_oStage.scaleY = 2 * Math.min(c / CANVAS_WIDTH, d / CANVAS_HEIGHT)) : s_bMobile ? ($("#canvas").css("width", c + "px"), $("#canvas").css("height", d + "px")) : (s_oStage.canvas.width = Math.floor(c), s_oStage.canvas.height = Math.floor(d), s_iScaleFactor = Math.min(c / CANVAS_WIDTH, d / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > e ? $("#canvas").css("top", e + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left",
            f + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(b, a) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (b > a ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

function isIOS() {
    var b = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); b.length;)
        if (navigator.platform === b.pop()) return !0;
    return s_bIsIphone = !1
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var b = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < b ? b : 0
}

function getMobileOperatingSystem() {
    var b = navigator.userAgent || navigator.vendor || window.opera;
    return b.match(/iPad/i) || b.match(/iPhone/i) || b.match(/iPod/i) ? "ios" : b.match(/Android/i) ? "android" : "unknown"
}

function stopSound(b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].stop()
}

function playSound(b, a, d) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[b].play(), s_aSounds[b].volume(a), s_aSounds[b].loop(d), s_aSounds[b]) : null
}

function setVolume(b, a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].volume(a)
}

function setMute(b, a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(b)
}

function soundPlaying(b) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) return s_aSounds[b].playing()
}

function createBitmap(b, a, d) {
    var c = new createjs.Bitmap(b),
        e = new createjs.Shape;
    a && d ? e.graphics.beginFill("#fff").drawRect(0, 0, a, d) : e.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
    c.hitArea = e;
    return c
}

function createSprite(b, a, d, c, e, f) {
    b = null !== a ? new createjs.Sprite(b, a) : new createjs.Sprite(b);
    a = new createjs.Shape;
    a.graphics.beginFill("#000000").drawRect(-d, -c, e, f);
    b.hitArea = a;
    return b
}

function randomFloatBetween(b, a, d) {
    "undefined" === typeof d && (d = 2);
    return parseFloat(Math.min(b + Math.random() * (a - b), a).toFixed(d))
}

function shuffle(b) {
    for (var a = b.length, d, c; 0 !== a;) c = Math.floor(Math.random() * a), --a, d = b[a], b[a] = b[c], b[c] = d;
    return b
}

function easeLinear(b, a, d, c) {
    return d * b / c + a
}

function easeInQuad(b, a, d, c) {
    return d * (b /= c) * b + a
}

function easeInSine(b, a, d, c) {
    return -d * Math.cos(b / c * (Math.PI / 2)) + d + a
}

function easeInCubic(b, a, d, c) {
    return d * (b /= c) * b * b + a
}

function getTrajectoryPoint(b, a) {
    var d = new createjs.Point,
        c = (1 - b) * (1 - b),
        e = b * b;
    d.x = c * a.start.x + 2 * (1 - b) * b * a.traj.x + e * a.end.x;
    d.y = c * a.start.y + 2 * (1 - b) * b * a.traj.y + e * a.end.y;
    return d
}

function formatTime(b) {
    b /= 1E3;
    var a = Math.floor(b / 60);
    b = parseFloat(b - 60 * a).toFixed(0);
    var d = "";
    d = 10 > a ? d + ("0" + a + ":") : d + (a + ":");
    return 10 > b ? d + ("0" + b) : d + b
}

function degreesToRadians(b) {
    return b * Math.PI / 180
}

function collideEdgeWithCircle(b, a, d) {
    if (null === b) return !1;
    b = closestPointOnLine(b.getPointA(), b.getPointB(), a);
    a = distanceV2(a, b);
    return d < a ? null : {
        distance: a,
        closest_point: b
    }
}

function circleDistFromLineSeg(b, a, d) {
    var c = d.p2.x - d.p1.x;
    var e = d.p2.y - d.p1.y;
    var f = b - d.p1.x;
    var h = a - d.p1.y;
    var g = (f * c + h * e) / (e * e + c * c);
    if (0 <= g && 1 >= g) return b = c * g + d.p1.x - b, a = e * g + d.p1.y - a, Math.sqrt(a * a + b * b);
    b -= d.p2.x;
    a -= d.p2.y;
    return Math.min(Math.sqrt(h * h + f * f), Math.sqrt(a * a + b * b))
}

function getAngleBetweenPoints(b, a, d, c) {
    return 180 * Math.atan2(c - a, d - b) / Math.PI
}

function randomSign() {
    return .5 >= Math.random() ? 1 : -1
}

function distanceBetweenTwoPoints(b, a, d, c) {
    b -= d;
    a -= c;
    return Math.sqrt(b * b + a * a)
}

function distance(b, a) {
    var d = b.x - a.x,
        c = b.y - a.y;
    return Math.sqrt(d * d + c * c)
}

function closestPointOnLine(b, a, d) {
    var c = new CVector2;
    c.setV(d);
    c.subtractV(b);
    d = new CVector2;
    d.setV(a);
    d.subtractV(b);
    d.normalize();
    c = dotProductV2(d, c);
    if (0 >= c) return b;
    if (c >= distanceV2(b, a)) return a;
    d.scalarProduct(c);
    d.addV(b);
    return d
}

function checkRectCollision(b, a) {
    var d = getBounds(b, .9);
    var c = getBounds(a, .98);
    return calculateIntersection(d, c)
}

function calculateIntersection(b, a) {
    var d, c, e, f;
    var h = b.x + (d = b.width / 2);
    var g = b.y + (c = b.height / 2);
    var l = a.x + (e = a.width / 2);
    var k = a.y + (f = a.height / 2);
    h = Math.abs(h - l) - (d + e);
    g = Math.abs(g - k) - (c + f);
    return 0 > h && 0 > g ? (h = Math.min(Math.min(b.width, a.width), -h), g = Math.min(Math.min(b.height, a.height), -g), {
        x: Math.max(b.x, a.x),
        y: Math.max(b.y, a.y),
        width: h,
        height: g,
        rect1: b,
        rect2: a
    }) : null
}

function centerBetweenPointsV2(b, a) {
    var d = new CVector2;
    d.set(.5 * (b.getX() + a.getX()), .5 * (b.getY() + a.getY()));
    return d
}

function dotProductV2(b, a) {
    return b.getX() * a.getX() + b.getY() * a.getY()
}

function distanceV2WithoutSquareRoot(b, a) {
    return (a.getX() - b.getX()) * (a.getX() - b.getX()) + (a.getY() - b.getY()) * (a.getY() - b.getY())
}

function distanceV2(b, a) {
    return Math.sqrt((a.getX() - b.getX()) * (a.getX() - b.getX()) + (a.getY() - b.getY()) * (a.getY() - b.getY()))
}

function reflectVectorV2(b, a) {
    var d = dotProductV2(b, a);
    b.set(b.getX() - 2 * d * a.getX(), b.getY() - 2 * d * a.getY());
    return b
}

function getBounds(b, a) {
    var d = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (b instanceof createjs.Container) {
        d.x2 = -Infinity;
        d.y2 = -Infinity;
        var c = b.children,
            e = c.length,
            f;
        for (f = 0; f < e; f++) {
            var h = getBounds(c[f], 1);
            h.x < d.x && (d.x = h.x);
            h.y < d.y && (d.y = h.y);
            h.x + h.width > d.x2 && (d.x2 = h.x + h.width);
            h.y + h.height > d.y2 && (d.y2 = h.y + h.height)
        }
        Infinity == d.x && (d.x = 0);
        Infinity == d.y && (d.y = 0);
        Infinity == d.x2 && (d.x2 = 0);
        Infinity == d.y2 && (d.y2 = 0);
        d.width = d.x2 - d.x;
        d.height = d.y2 - d.y;
        delete d.x2;
        delete d.y2
    } else {
        if (b instanceof createjs.Bitmap) {
            e =
                b.sourceRect || b.image;
            f = e.width * a;
            var g = e.height * a
        } else if (b instanceof createjs.Sprite)
            if (b.spriteSheet._frames && b.spriteSheet._frames[b.currentFrame] && b.spriteSheet._frames[b.currentFrame].image) {
                e = b.spriteSheet.getFrame(b.currentFrame);
                f = e.rect.width;
                g = e.rect.height;
                c = e.regX;
                var l = e.regY
            } else d.x = b.x || 0, d.y = b.y || 0;
        else d.x = b.x || 0, d.y = b.y || 0;
        c = c || 0;
        f = f || 0;
        l = l || 0;
        g = g || 0;
        d.regX = c;
        d.regY = l;
        e = b.localToGlobal(0 - c, 0 - l);
        h = b.localToGlobal(f - c, g - l);
        f = b.localToGlobal(f - c, 0 - l);
        c = b.localToGlobal(0 - c, g - l);
        d.x =
            Math.min(Math.min(Math.min(e.x, h.x), f.x), c.x);
        d.y = Math.min(Math.min(Math.min(e.y, h.y), f.y), c.y);
        d.width = Math.max(Math.max(Math.max(e.x, h.x), f.x), c.x) - d.x;
        d.height = Math.max(Math.max(Math.max(e.y, h.y), f.y), c.y) - d.y
    }
    return d
}

function NoClickDelay(b) {
    this.element = b;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function (b) {
        switch (b.type) {
            case "touchstart":
                this.onTouchStart(b);
                break;
            case "touchmove":
                this.onTouchMove(b);
                break;
            case "touchend":
                this.onTouchEnd(b)
        }
    },
    onTouchStart: function (b) {
        b.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function (b) {
        this.moved = !0
    },
    onTouchEnd: function (b) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
            3 == b.nodeType && (b = b.parentNode);
            var a = document.createEvent("MouseEvents");
            a.initEvent("click", !0, !0);
            b.dispatchEvent(a)
        }
    }
};
(function () {
    function b(b) {
        var c = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in c ? document.body.className = c[b.type] : (document.body.className = this[a] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var a = "hidden";
    a in document ? document.addEventListener("visibilitychange", b) : (a = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", b) : (a = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", b) : (a = "msHidden") in document ? document.addEventListener("msvisibilitychange", b) : "onfocusin" in document ? document.onfocusin = document.onfocusout = b : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b
})();

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function toDegree(b) {
    return 180 / Math.PI * b
}

function getParamValue(b) {
    for (var a = window.location.search.substring(1).split("&"), d = 0; d < a.length; d++) {
        var c = a[d].split("=");
        if (c[0] == b) return c[1]
    }
}

function saveItem(b, a) {
    s_bStorageAvailable && localStorage.setItem(b, a)
}

function getItem(b) {
    return s_bStorageAvailable ? localStorage.getItem(b) : null
}

function setItemJson(b, a) {
    s_bStorageAvailable && localStorage.setItem(b, JSON.stringify(a))
}

function getItemJson(b) {
    return s_bStorageAvailable ? JSON.parse(localStorage.getItem(b)) : null
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.enabled && (s_bFullscreen = screen.height < window.innerHeight + 3 && screen.height > window.innerHeight - 3 ? !0 : !1, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.enabled) screenfull.on("change", function () {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});
var settings = {
    gameId: "619b2b7f28c647afba2a153a3316d5cc",
    userId: "91A55D35-4129-4833-9EE3-8C96BA2CA479-s1",
    pauseGame: function () {
        console.log("Pause game");
        s_oMain.stopUpdate()
    },
    resumeGame: function () {
        console.log("Resume game");
        s_oMain.startUpdate()
    },
    onInit: function (b) {
        console.log("Init: ", b)
    },
    onError: function (b) {
        console.log("Error: ", b)
    }
};
(function (b, a, d, c, e, f, h) {
    b.GameDistribution = e;
    b[e] = b[e] || function () {
        (b[e].q = b[e].q || []).push(arguments)
    };
    b[e].l = 1 * new Date;
    f = a.createElement(d);
    h = a.getElementsByTagName(d)[0];
    f.async = 1;
    f.src = c;
    h.parentNode.insertBefore(f, h)
})(window, document, "script", "", "gdApi");
gdApi(settings);

function CSpriteLibrary() {
    var b, a, d, c, e, f;
    this.init = function (h, g, l) {
        d = a = 0;
        c = h;
        e = g;
        f = l;
        b = {}
    };
    this.addSprite = function (c, d) {
        b.hasOwnProperty(c) || (b[c] = {
            szPath: d,
            oSprite: new Image
        }, a++)
    };
    this.getSprite = function (a) {
        return b.hasOwnProperty(a) ? b[a].oSprite : null
    };
    this._onSpritesLoaded = function () {
        e.call(f)
    };
    this._onSpriteLoaded = function () {
        c.call(f);
        ++d === a && this._onSpritesLoaded()
    };
    this.loadSprites = function () {
        for (var a in b) b[a].oSprite.oSpriteLibrary = this, b[a].oSprite.onload = function () {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            b[a].oSprite.src = b[a].szPath
    };
    this.getNumSprites = function () {
        return a
    }
}
var CANVAS_WIDTH = 768,
    CANVAS_HEIGHT = 1400,
    CANVAS_WIDTH_HALF = 384,
    CANVAS_HEIGHT_HALF = 700,
    EDGEBOARD_X = 0,
    EDGEBOARD_Y = 200,
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    PRIMARY_FONT = "comfortaa",
    PRIMARY_FONT_COLOUR = "#ee590b",
    SECONDARY_FONT_COLOUR = "#000000",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 2,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    EDGE_LEFT = 0,
    EDGE_RIGHT = 1,
    EDGE_TOP = 2,
    EDGE_BOTTOM = 3,
    EDGE_TOP_LEFT = 0,
    EDGE_TOP_RIGHT = 1,
    EDGE_BOTTOM_LEFT = 2,
    EDGE_BOTTOM_RIGHT = 3,
    BALL_SCALE_MAX_LIMIT =
    7,
    BALL_SCALE_VARIABLE_MIN = .2,
    SWIPE_LIMIT_MIN = 100,
    FORCE_X_LIMIT_MAX = .95,
    FORCE_X_LIMIT_MIN = -.95,
    BOARD_SIDES_SIZE = 10,
    BOARD_SIDES_RADIUS = .5 * BOARD_SIDES_SIZE,
    LAUNCH_POWER_LIMIT_MIN = 37,
    BALL_RADIUS_TOLERANCE_FACTOR = 1.05,
    PHYSICS_ITERATIONS = 2,
    BALL_SIZE = 100,
    GRAVITY_Y = .4,
    BOTTOM_LIMIT = 1100,
    BOARD_HOOP_Y_OFFSET = 140,
    PLAYER_LIFE_SIZE = 55,
    BALL_FORCE_MINIMUM_LIMIT = 8,
    DAMPING_VARIABLE = .9,
    BALL_LIMIT_FADEOUT = CANVAS_HEIGHT_HALF + BALL_SIZE,
    BOARD_MOVEMENT_HORIZONTAL = 150,
    BOARD_MOVEMENT_VERTICAL = 100,
    BOARD_MOVEMENT_DURATION = 3E3,
    PARTICLE_COLOR = "#e91300 #f12c00 #ff4e02 #ff6c07 #f82000 #af0302".split(" "),
    NO_BONUS = 1,
    PLAYER_LIVES, BALL_POINTS, STAR_BONUS_POINTS, BONUS_MULTIPLIER, BONUS_NO_COLLISIONS, RANDOM_BALL_START_LIMIT, BOARD_HORIZONTAL_MOVEMENT_LIMIT, BOARD_VERTICAL_MOVEMENT_LIMIT, RANDOM_BONUS_OCCURRENCY, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION;

function CEdge(b, a, d, c, e, f, h) {
    var g, l, k, r, m, t, w, q;
    this.init = function (a, b, c, d, e) {
        q = 0;
        m = new CEdgeModel(a, b, c, d, h);
        var g = m.getLength();
        (w = f) && (t = new CEdgeViewer(a, b, c, d, g, e))
    };
    this.getModel = function () {
        return m
    };
    this.moveY = function (a) {
        w && t.moveY(a);
        m.moveY(a)
    };
    this.moveX = function (a) {
        w && t.moveX(a);
        m.moveX(a)
    };
    this.changeSize = function (a) {
        q += a;
        k = m.getPointA().getX();
        r = m.getPointA().getY();
        g = m.getPointB().getX();
        l = m.getPointB().getY();
        m.destroy();
        m = new CEdgeModel(k + a, r, g - a, l);
        w && (t.unload(), t = new CEdgeViewer(m.getPointA().getX(),
            m.getPointA().getY(), m.getPointB().getX(), m.getPointB().getY(), m.getLength(), e))
    };
    this.destroy = function () {
        m.destroy();
        w && t.unload()
    };
    this.resetSize = function (a) {
        k = m.getPointA().getX();
        r = m.getPointA().getY();
        g = m.getPointB().getX();
        l = m.getPointB().getY();
        m.destroy();
        var b = 0 < q * a ? 0 < a ? -1 : 1 : 0 > a ? -1 : 1;
        m = 0 > q * a ? new CEdgeModel(k - b * a * q, r, g + b * a * q, l) : new CEdgeModel(k + b * a * q, r, g - b * a * q, l);
        q = 0;
        w && (t.unload(), t = new CEdgeViewer(m.getPointA().getX(), m.getPointA().getY(), m.getPointB().getX(), m.getPointB().getY(), m.getLength(),
            e))
    };
    this.init(b, a, d, c, e)
}

function CEdgeModel(b, a, d, c) {
    var e = null,
        f = null,
        h = null,
        g = null,
        l = null;
    this._init = function (a, b, c, d) {
        this.set(a, b, c, d)
    };
    this.destroy = function () {
        l = g = h = f = e = null
    };
    this.render = function (a) {
        a.moveTo(e.x, e.y);
        a.lineTo(f.x, f.y)
    };
    this.toString = function (a) {
        trace(a + " " + e.x + " " + e.y + " " + f.x + " " + f.y)
    };
    this.add = function (a) {
        e.addV(a);
        f.addV(a)
    };
    this.editSize = function (a) {
        e.subtractV(a);
        f.addV(a);
        this.calculateNormal();
        this.calculateCenter()
    };
    this.set = function (a, b, c, d) {
        e = new CVector2;
        f = new CVector2;
        e.set(a, b);
        f.set(c,
            d);
        this.calculateNormal();
        this.calculateCenter()
    };
    this.moveY = function (a) {
        e.add(0, a);
        f.add(0, a);
        this.calculateNormal();
        this.calculateCenter()
    };
    this.moveX = function (a) {
        e.add(a, 0);
        f.add(a, 0);
        this.calculateNormal();
        this.calculateCenter()
    };
    this.scale = function (a) {
        e.scalarProduct(a);
        f.scalarProduct(a);
        this.calculateNormal();
        this.calculateCenter()
    };
    this.calculateNormal = function () {
        l = null;
        l = new CVector2;
        l.setV(f);
        l.subtractV(e);
        l.rot90CCW();
        l.normalize()
    };
    this.calculateCenter = function () {
        h = null;
        h = centerBetweenPointsV2(e,
            f);
        g = new CVector2;
        g.setV(l);
        g.scalarProduct(5);
        g.addV(h)
    };
    this.getPointA = function () {
        return e
    };
    this.m_pCenter = function () {
        return h
    };
    this.getPointB = function () {
        return f
    };
    this.getNormal = function () {
        return l
    };
    this.renderNormal = function (a) {
        a.moveTo(h.x, h.y);
        a.lineTo(g.x, g.y)
    };
    this.getLength = function () {
        return Math.sqrt(Math.pow(d - b, 2) + Math.pow(c - a, 2))
    };
    this._init(b, a, d, c);
    return this
}

function CEdgeViewer(b, a, d, c, e, f) {
    var h;
    this.init = function (a, b, c, d, e, f) {
        a = a > c || b > d ? b === d ? (new createjs.Graphics).beginFill("#FFF").drawRect(c, d, e, f) : (new createjs.Graphics).beginFill("#FFF").drawRect(c, d, f, e) : b === d ? (new createjs.Graphics).beginFill("#FFF").drawRect(a, b, e, f) : (new createjs.Graphics).beginFill("#FFF").drawRect(a, b, f, e);
        h = new createjs.Shape(a);
        h.y = -f / 2;
        h.alpha = .3;
        s_oStage.addChild(h)
    };
    this.moveY = function (a) {
        h.y += a
    };
    this.moveX = function (a) {
        h.x += a
    };
    this.unload = function () {
        s_oStage.removeChild(h)
    };
    this.init(b, a, d, c, e, f)
}

function CVector2(b, a) {
    var d, c;
    this._init = function (a, b) {
        d = a;
        c = b
    };
    this.add = function (a, b) {
        d += a;
        c += b
    };
    this.addV = function (a) {
        d += a.getX();
        c += a.getY()
    };
    this.scalarDivision = function (a) {
        d /= a;
        c /= a
    };
    this.subtract = function (a, b) {
        d -= a;
        c -= b
    };
    this.subtractV = function (a) {
        d -= a.getX();
        c -= a.getY()
    };
    this.scalarProduct = function (a) {
        d *= a;
        c *= a
    };
    this.invert = function () {
        d *= -1;
        c *= -1
    };
    this.dotProduct = function (a) {
        return d * a.getX() + c * a.getY()
    };
    this.set = function (a, b) {
        d = a;
        c = b
    };
    this.setV = function (a) {
        d = a.getX();
        c = a.getY()
    };
    this.length =
        function () {
            return Math.sqrt(d * d + c * c)
        };
    this.length2 = function () {
        return d * d + c * c
    };
    this.normalize = function () {
        var a = this.length();
        0 < a && (d /= a, c /= a)
    };
    this.angleBetweenVectors = function (a) {
        a = Math.acos(this.dotProduct(a) / (this.length() * a.length()));
        return !0 === isNaN(a) ? 0 : a
    };
    this.getNormalize = function (a) {
        this.length();
        a.set(d, c);
        a.normalize()
    };
    this.rot90CCW = function () {
        var a = d;
        d = -c;
        c = a
    };
    this.rot90CW = function () {
        var a = d;
        d = c;
        c = -a
    };
    this.getRotCCW = function (a) {
        a.set(d, c);
        a.rot90CCW()
    };
    this.getRotCW = function (a) {
        a.set(d,
            c);
        a.rot90CW()
    };
    this.ceil = function () {
        d = Math.ceil(d);
        c = Math.ceil(c)
    };
    this.round = function () {
        d = Math.round(d);
        c = Math.round(c)
    };
    this.toString = function () {
        return "Vector2: " + d + ", " + c
    };
    this.print = function () {
        trace("Vector2: " + d + ", " + c + "")
    };
    this.getX = function () {
        return d
    };
    this.getY = function () {
        return c
    };
    this.getZ = function () {
        return 0
    };
    this.rotate = function (a) {
        var b = d,
            e = c;
        d = b * Math.cos(a) + e * Math.sin(a);
        c = b * -Math.sin(a) + e * Math.cos(a)
    };
    this._init(b, a)
}

function CVector3(b, a, d) {
    var c, e, f;
    this._init = function (a, b, d) {
        c = a;
        e = b;
        f = d
    };
    this.add = function (a, b, d) {
        c += a;
        e += b;
        f += d
    };
    this.addV = function (a) {
        c += a.getX();
        e += a.getY();
        f += a.getZ()
    };
    this.scalarDivision = function (a) {
        c /= a;
        e /= a;
        f /= a
    };
    this.subtract = function (a, b, d) {
        c -= a;
        e -= b;
        f -= d
    };
    this.subtractV = function (a) {
        c -= a.getX();
        e -= a.getY();
        f -= a.getZ()
    };
    this.scalarProduct = function (a) {
        c *= a;
        e *= a;
        f *= a
    };
    this.invert = function () {
        c *= -1;
        e *= -1;
        f *= -1
    };
    this.dotProduct = function (a) {
        return c * a.getX() + e * a.getY() + f * a.getZ()
    };
    this.set = function (a,
        b, d) {
        c = a;
        e = b;
        f = d
    };
    this.setV = function (a) {
        c = a.getX();
        e = a.getY();
        f = a.getZ()
    };
    this.length = function () {
        return Math.sqrt(c * c + e * e + f * f)
    };
    this.lengthSquare = function () {
        return c * c + e * e + f * f
    };
    this.normalize = function () {
        var a = this.length();
        0 < a && (c /= a, e /= a, f /= a)
    };
    this.getNormalize = function (a) {
        this.length();
        a.set(c, e, f);
        a.normalize()
    };
    this.ceil = function () {
        c = Math.ceil(c);
        e = Math.ceil(e);
        f = Math.ceil(f)
    };
    this.round = function () {
        c = Math.round(c);
        e = Math.round(e);
        f = Math.round(f)
    };
    this.getX = function () {
        return c
    };
    this.getY = function () {
        return e
    };
    this.getZ = function () {
        return f
    };
    this.toString = function () {
        return "Vector3: " + c + ", " + e + ", " + f
    };
    this.print = function () {
        trace("Vector3: " + c + ", " + e + ", " + f)
    };
    this._init(b, a, d)
}

function CTweenController() {
    this.tweenValue = function (b, a, d) {
        return b + d * (a - b)
    };
    this.easeLinear = function (b, a, d, c) {
        return d * b / c + a
    };
    this.easeInCubic = function (b, a, d, c) {
        c = (b /= c) * b * b;
        return a + d * c
    };
    this.easeBackInQuart = function (b, a, d, c) {
        c = (b /= c) * b;
        return a + d * (2 * c * c + 2 * c * b + -3 * c)
    };
    this.easeInBack = function (b, a, d, c) {
        return d * (b /= c) * b * (2.70158 * b - 1.70158) + a
    };
    this.easeOutCubic = function (b, a, d, c) {
        return d * ((b = b / c - 1) * b * b + 1) + a
    };
    this.getTrajectoryPoint = function (b, a) {
        var d = new createjs.Point,
            c = (1 - b) * (1 - b),
            e = b * b;
        d.x = c *
            a.start.x + 2 * (1 - b) * b * a.traj.x + e * a.end.x;
        d.y = c * a.start.y + 2 * (1 - b) * b * a.traj.y + e * a.end.y;
        return d
    };
    s_oTweenController = this
}

function CShake(b, a, d, c) {
    var e, f, h, g, l, k, r;
    this._init = function (a, b, c, d) {
        g = h = !1;
        k = 0;
        this._calculateDuration();
        e = a.x;
        f = a.y;
        h || (h = !0, l = setInterval(function () {
            m._tremble()
        }, c))
    };
    this.updateObject = function (a) {
        e = a.x;
        f = a.y
    };
    this._tremble = function () {
        if (g = !g) {
            var t = Math.random(),
                w = c *= .95,
                q = c;
            q = .5 > Math.random() ? -q : q;
            b.x += .5 > t ? -w : w;
            b.y += q
        } else b.x = e, b.y = f;
        k++;
        k > r && (k = 0, h = !1, b.x = e, b.y = f, 0 === a ? l = setInterval(function () {
            m._tremble()
        }, d) : clearInterval(l))
    };
    this._calculateDuration = function () {
        r = a / d
    };
    this.stopTremble =
        function () {
            clearInterval(l)
        };
    var m = this;
    this._init(b, a, d, c)
}
var TEXT_HELP1 = "SWIPE THE BALL TOWARDS THE HOOP TO SCORE",
    TEXT_HELP2 = "TRY AND GET BONUS POINTS WITH YOUR BALL",
    TEXT_HELP3 = "BUT BEWARE: IF YOU MISS A HOOP, YOU LOSE A BALL!",
    TEXT_BEST = "BEST",
    TEXT_BEST_SCORE = "YOUR BEST SCORE",
    TEXT_SCORE = "SCORE",
    TEXT_BONUS = "BONUS",
    TEXT_GAMEOVER = "GAME OVER!\nTRY AGAIN?",
    TEXT_ARE_SURE = "ARE YOU SURE YOU WANT TO EXIT? ALL UNSAVED PROGRESS WILL BE LOST",
    TEXT_NEWBESTSCORE = "NEW BEST SCORE!",
    TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
    TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT STORING SETTING LOCALLY. IN SAFARI, THE MOST COMMON CAUSE OF THIS IS USING 'PRIVATE BROWSING MODE'. SOME INFO MAY NOT SAVE OR SOME FEATURE MAY NOT WORK PROPERLY.",
    TEXT_SHARE_IMAGE = "200x200.jpg",
    TEXT_SHARE_TITLE = "Congratulations!",
    TEXT_SHARE_MSG1 = "You collected <strong>",
    TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!",
    TEXT_SHARE_SHARE1 = "My score is ",
    TEXT_SHARE_SHARE2 = " points! Can you do better";

function CPreloader() {
    var b, a, d, c, e, f, h;
    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_preloader", "./sprites/bg_preloader.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        h = new createjs.Container;
        s_oStage.addChild(h)
    };
    this.unload = function () {
        h.removeAllChildren()
    };
    this.hide = function () {
        var a = this;
        setTimeout(function () {
            createjs.Tween.get(f).to({
                alpha: 1
            }, 500).call(function () {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function () {};
    this._onAllImagesLoaded = function () {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function () {
        var g = createBitmap(s_oSpriteLibrary.getSprite("bg_preloader"));
        h.addChild(g);
        g = s_oSpriteLibrary.getSprite("progress_bar");
        c = createBitmap(g);
        c.x = CANVAS_WIDTH / 2 - g.width / 2;
        c.y = CANVAS_HEIGHT - 380;
        h.addChild(c);
        b = g.width;
        a = g.height;
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(c.x, c.y, 1, a);
        h.addChild(e);
        c.mask = e;
        d = new createjs.Text("", "30px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT - 390;
        d.textBaseline = "alphabetic";
        d.textAlign = "center";
        h.addChild(d);
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        h.addChild(f)
    };
    this.refreshLoader = function (f) {
        d.text = f + "%";
        e.graphics.clear();
        f = Math.floor(f * b / 100);
        e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(c.x, c.y, f, a)
    };
    this._init()
}

function CMain(b) {
    var a, d = 0,
        c = 0,
        e = STATE_LOADING,
        f, h, g;
    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function (a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        f = new CPreloader
    };
    this.preloaderReady = function () {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        a = !0
    };
    this.soundLoaded = function () {
        d++;
        f.refreshLoader(Math.floor(d / c * 100));
        d === c && this._onRemovePreloader()
    };
    this._initSounds = function () {
        var a = [];
        a.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        a.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        a.push({
            path: "./sounds/",
            filename: "game_over",
            loop: !1,
            volume: 1,
            ingamename: "game_over"
        });
        a.push({
            path: "./sounds/",
            filename: "boing",
            loop: !1,
            volume: 1,
            ingamename: "boing"
        });
        a.push({
            path: "./sounds/",
            filename: "bonus_taken",
            loop: !1,
            volume: 1,
            ingamename: "bonus_taken"
        });
        a.push({
            path: "./sounds/",
            filename: "bonus",
            loop: !1,
            volume: 1,
            ingamename: "bonus"
        });
        a.push({
            path: "./sounds/",
            filename: "swish",
            loop: !1,
            volume: 1,
            ingamename: "swish"
        });
        a.push({
            path: "./sounds/",
            filename: "score",
            loop: !1,
            volume: 1,
            ingamename: "score"
        });
        a.push({
            path: "./sounds/",
            filename: "malus",
            loop: !1,
            volume: 1,
            ingamename: "malus"
        });
        a.push({
            path: "./sounds/",
            filename: "newbestscore",
            loop: !1,
            volume: 1,
            ingamename: "newbestscore"
        });
        c += a.length;
        s_aSounds = [];
        for (var b = 0; b < a.length; b++) s_aSounds[a[b].ingamename] = new Howl({
            src: [a[b].path + a[b].filename + ".mp3", a[b].path + a[b].filename + ".ogg"],
            autoplay: !1,
            preload: !0,
            loop: a[b].loop,
            volume: a[b].volume,
            onload: s_oMain.soundLoaded()
        })
    };
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_exit",
            "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_big", "./sprites/msg_box_big.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl",
            "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("bonus", "./sprites/bonus.png");
        s_oSpriteLibrary.addSprite("ball",
            "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("ball_bonus", "./sprites/ball_bonus.png");
        s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/ball_shadow.png");
        s_oSpriteLibrary.addSprite("board", "./sprites/board.png");
        s_oSpriteLibrary.addSprite("hoop", "./sprites/hoop.png");
        s_oSpriteLibrary.addSprite("player_life", "./sprites/player_life.png");
        c += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function () {
        d++;
        f.refreshLoader(Math.floor(d / c * 100));
        d === c && this._onRemovePreloader()
    };
    this._onAllImagesLoaded = function () {};
    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages()
    };
    this._onRemovePreloader = function () {
        try {
            saveItem("ls_available", "ok")
        } catch (k) {
            s_bStorageAvailable = !1
        }
        f.unload();
        isIOS() || !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || (s_oSoundTrack = playSound("soundtrack", 1, !0));
        this.gotoMenu()
    };
    this.gotoMenu = function () {
        h = new CMenu;
        e = STATE_MENU;
        showMoreGames()
    };
    this.gotoGame = function () {
        g = new CGame(l);
        e = STATE_GAME;
        $(s_oMain).trigger("start_session");
        hideMoreGames()
    };
    this.gotoHelp =
        function () {
            new CHelp;
            e = STATE_HELP
        };
    this.stopUpdate = function () {
        a = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        s_bAudioActive && Howler.mute(!0)
    };
    this.startUpdate = function () {
        s_iPrevTime = (new Date).getTime();
        a = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        s_bAudioActive && Howler.mute(!1)
    };
    this._update = function (b) {
        if (!1 !== a) {
            var c = (new Date).getTime();
            s_iTimeElaps = c - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = c;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
                s_iCntTime -= 1E3, s_iCntFps = 0);
            e === STATE_MENU && h.update();
            e === STATE_GAME && g.update();
            s_oStage.update(b)
        }
    };
    s_oMain = this;
    var l = b;
    ENABLE_FULLSCREEN = b.fullscreen;
    ENABLE_CHECK_ORIENTATION = b.check_orientation;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null,
    s_oCanvas, s_iTotalScore = 0,
    s_iBestScore = 0,
    s_bStorageAvailable = !0,
    s_bFirstTimePlaying;

function CMenu() {
    var b, a, d, c, e, f, h, g, l, k, r, m, t, w, q = null,
        y = null,
        x;
    this._init = function () {
        h = new createjs.Container;
        s_oStage.addChild(h);
        s_bFirstTimePlaying = !0;
        g = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        h.addChild(g);
        var p = s_oSpriteLibrary.getSprite("logo_menu");
        l = createBitmap(p);
        l.regX = p.width / 2;
        l.regY = p.height / 2;
        l.x = CANVAS_WIDTH / 2;
        l.y = -150;
        createjs.Tween.get(l, {
            loop: !1
        }).to({
            y: CANVAS_HEIGHT_HALF - 100
        }, 1E3, createjs.Ease.cubicOut);
        h.addChild(l);
        x = new createjs.Text(TEXT_BEST_SCORE + ": 0", "36px " +
            PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        x.textAlign = "center";
        x.textBaseline = "alphabetic";
        x.x = CANVAS_WIDTH_HALF;
        x.y = CANVAS_HEIGHT_HALF + 150;
        x.lineWidth = 450;
        x.visible = !1;
        h.addChild(x);
        p = s_oSpriteLibrary.getSprite("but_play");
        k = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT_HALF + 391, p, h);
        k.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        p = s_oSpriteLibrary.getSprite("but_credits");
        d = 20 + p.width / 2;
        c = p.height / 2 + 10;
        t = new CGfxButton(d, c, p, h);
        t.addEventListener(ON_MOUSE_UP, this._onCredits, this);
        if (!1 === DISABLE_SOUND_MOBILE ||
            !1 === s_bMobile) p = s_oSpriteLibrary.getSprite("audio_icon"), e = CANVAS_WIDTH - p.width / 4 - 20, f = p.height / 2 + 10, m = new CToggle(e, f, p, s_bAudioActive, h), m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        p = window.document;
        var u = p.documentElement;
        q = u.requestFullscreen || u.mozRequestFullScreen || u.webkitRequestFullScreen || u.msRequestFullscreen;
        y = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (q = !1);
        q && screenfull.enabled && (p = s_oSpriteLibrary.getSprite("but_fullscreen"),
            b = d + p.width / 2 + 10, a = c, w = new CToggle(b, a, p, s_bFullscreen, h), w.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        r = new createjs.Shape;
        r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(r);
        createjs.Tween.get(r).to({
            alpha: 0
        }, 1E3).call(function () {
            h.removeChild(r)
        });
        s_bStorageAvailable ? (p = getItem("swipebasketball_total_score"), s_iTotalScore = null !== p && void 0 !== p ? Number(p) : 0, p = getItem("swipebasketball_best_score"), null !== p && void 0 !== p ? (s_iBestScore = p, x.text = TEXT_BEST_SCORE +
            ": " + s_iBestScore, x.visible = !0) : (s_iBestScore = 0, x.text = TEXT_BEST_SCORE + ": " + s_iBestScore, x.visible = !1)) : new CMsgBox(TEXT_ERR_LS, h);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function () {
        k.unload();
        k = null;
        t.unload();
        h.removeChild(g);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m.unload(), m = null;
        q && screenfull.enabled && w.unload();
        s_oMenu = null
    };
    this.refreshButtonPos = function (g, h) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || m.setPosition(e - g, f + h);
        q && screenfull.enabled && w.setPosition(b + g, a +
            h);
        t.setPosition(d + g, c + h)
    };
    this.resetFullscreenBut = function () {
        q && screenfull.enabled && w.setActive(s_bFullscreen)
    };
    this.exitFromCredits = function () {};
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onCredits = function () {
        new CCreditsPanel
    };
    this._onButPlayRelease = function () {
        this.unload();
        isIOS() && null === s_oSoundTrack || playSound("click", 1, !1);
        s_oMain.gotoGame()
    };
    this._onFullscreenRelease = function () {
        s_bFullscreen ? y.call(window.document) : q.call(window.document.documentElement);
        sizeHandler()
    };
    this.update = function () {};
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(b) {
    var a, d, c, e, f, h, g, l, k, r, m, t, w, q, y, x, p, u, D, L, H, M, z, I, P, J, N, n, v, A, B, C, E, O, F, G;
    this._init = function () {
        s_oTweenController = new CTweenController;
        z = new createjs.Container;
        s_oStage.addChild(z);
        this.resetVariables();
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        a.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        z.addChild(a);
        L = BOTTOM_LIMIT - BALL_SIZE / 2;
        N = {
            x: CANVAS_WIDTH_HALF,
            y: L
        };
        F = new CVector3(0, GRAVITY_Y, 0);
        F.normalize();
        v = new CBoard(z);
        this.initHoop();
        this.initScoreBonusText();
        this.initNewBestScoreText();
        O = new CShake(A, 500, 7, 20);
        n = new CBall(z);
        this.initRingEdgeNormal();
        this.initHitArea();
        I = new CInterface(z);
        I.initInterfacesText();
        I.updatePlayerLives();
        !0 === s_bFirstTimePlaying ? CHelpPanel() : this._onExitHelp()
    };
    this.initRingEdgeNormal = function () {
        G = new CVector2(0, -1);
        G.normalize()
    };
    this.initHoop = function () {
        var a = {
            images: [s_oSpriteLibrary.getSprite("hoop")],
            framerate: 20,
            frames: {
                width: 256,
                height: 284,
                regX: 128,
                regY: 142
            },
            animations: {
                idle: [0, 0, "idle"],
                move: [1, 15, "idle"]
            }
        };
        a = new createjs.SpriteSheet(a);
        A = createSprite(a,
            "idle", 128, 142, 256, 284);
        A.scaleX = A.scaleY = .7;
        A.x = v.getX();
        A.y = v.getY() + BOARD_HOOP_Y_OFFSET;
        z.addChild(A)
    };
    this.moveHoop = function () {
        "idle" === A.currentAnimation && A.gotoAndPlay("move")
    };
    this.initNewBestScoreText = function () {
        E = new createjs.Text(TEXT_NEWBESTSCORE, "50px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        E.textAlign = "center";
        E.textBaseline = "alphabetic";
        E.x = CANVAS_WIDTH_HALF;
        E.y = CANVAS_HEIGHT_HALF + 200;
        E.visible = !1;
        z.addChild(E)
    };
    this.initScoreBonusText = function () {
        C = new createjs.Text("x" + BONUS_MULTIPLIER +
            " " + TEXT_BONUS + "!", "50px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        C.textAlign = "center";
        C.textBaseline = "alphabetic";
        C.x = CANVAS_WIDTH_HALF;
        C.y = CANVAS_HEIGHT_HALF - 350;
        C.visible = !1;
        z.addChild(C)
    };
    this.resetTurnVariables = function () {
        x = y = q = k = w = t = l = g = !1
    };
    this.resetVariables = function () {
        P = null;
        f = !1;
        this.resetTurnVariables();
        p = m = r = h = !1;
        D = 0;
        H = NO_BONUS;
        M = PLAYER_LIVES;
        u = s_iTotalScore;
        B = null;
        setVolume("soundtrack", .5)
    };
    this.getBallStartPosition = function () {
        return N
    };
    this.initHitArea = function () {
        J = new createjs.Shape;
        J.graphics.beginFill("black").drawRect(0,
            0, CANVAS_WIDTH, CANVAS_HEIGHT);
        J.alpha = .01;
        J.on("mousedown", function (a) {
            s_oGame.onPressDown(a)
        });
        J.on("pressmove", function (a) {
            s_oGame.onPressMove(a)
        });
        J.on("pressup", function () {
            s_oGame.onPressUp()
        });
        z.addChild(J)
    };
    this.onPressDown = function (a) {
        g || (c = s_oStage.mouseX, e = s_oStage.mouseY)
    };
    this.onPressMove = function (b) {
        g || (a = s_oStage.mouseX, d = s_oStage.mouseY, l = !0)
    };
    this.onPressUp = function () {
        l && !g && (this.launchBallOnClick(), l = !1)
    };
    this.launchBallOnClick = function () {
        if (!(distanceBetweenTwoPoints(c, e, a, d) < SWIPE_LIMIT_MIN)) {
            playSound("swish",
                1, !1);
            n.shadowFadeOut();
            var b = new CVector3(a - c, d - e, 1);
            0 < d - e && b.set(a - c, -1, 1);
            b.normalize();
            b.getX() > FORCE_X_LIMIT_MAX && b.set(FORCE_X_LIMIT_MAX, -1, 1);
            b.getX() < FORCE_X_LIMIT_MIN && b.set(FORCE_X_LIMIT_MIN, -1, 1);
            this.launchBall(b);
            n.startBallAnimation();
            d = a = 0;
            this.setLaunched(!0)
        }
    };
    this.launchBall = function (a) {
        var b = n.vCurForce();
        a = new CVector3(a.getX(), a.getY(), a.getZ());
        a.scalarProduct(LAUNCH_POWER_LIMIT_MIN);
        b.setV(a)
    };
    this.setLaunched = function (a) {
        g = a
    };
    this.unload = function () {
        I.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        s_oGame = null
    };
    this.onExit = function () {
        setVolume("soundtrack", 1);
        s_oGame.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad")
    };
    this.restart = function () {
        setVolume("soundtrack", .3);
        $(s_oMain).trigger("restart_level");
        s_oGame.unload();
        s_oMain.gotoGame()
    };
    this._onExitHelp = function () {
        f = !0;
        this.setTurn(!0);
        s_bFirstTimePlaying = !1
    };
    this.updateScore = function () {
        s_iTotalScore = u += D;
        saveItem("swipebasketball_total_score", s_iTotalScore);
        D > s_iBestScore && (s_iBestScore = D, saveItem("swipebasketball_best_score", s_iBestScore))
    };
    this.addScore = function (a, b) {
        var c = 1;
        !0 === m && (c = BONUS_MULTIPLIER);
        this.initScoreText(a * c, b);
        D += a * c;
        I.refreshScoreText(D);
        D > s_iBestScore && (this.showNewBestScore(), s_iBestScore = D, saveItem("swipebasketball_best_score", s_iBestScore), I.refreshBestScoreText(), p = !0)
    };
    this.checkForBoardMovement = function () {
        D >= BOARD_HORIZONTAL_MOVEMENT_LIMIT && (v.setBoardHorizontalMovement(!0), !1 === v.isUpdate() && (v.resetBoardMovement(), v.setUpdate(!0)));
        D >= BOARD_VERTICAL_MOVEMENT_LIMIT && v.setBoardVerticalMovement(!0)
    };
    this.initScoreText = function (a, b) {
        var c = !1 === b ? v.getY() : v.getY() - 100;
        var d = new createjs.Text("+" + a, "40px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        d.x = v.getX();
        d.y = c;
        z.addChild(d);
        createjs.Tween.get(d).to({
            y: d.y - 300,
            alpha: 0
        }, 1500, createjs.Ease.quadIn).call(function () {
            createjs.Tween.removeTweens(d);
            z.removeChild(d)
        })
    };
    this.gameOver = function () {
        f = !1;
        this.updateScore();
        null === P && (playSound("game_over",
            1, !1), stopSound("soundtrack"), setTimeout(function () {
            playSound("soundtrack", .5, !1)
        }, 2E3), P = new CEndPanel(D), $(s_oMain).trigger("share_event", s_iTotalScore), $(s_oMain).trigger("save_score", s_iTotalScore))
    };
    this.setTurn = function (a) {
        h = a
    };
    this.setNetInFront = function () {
        z.setChildIndex(A, z.numChildren - 1)
    };
    this.resetNetZIndex = function () {
        z.addChildAt(A, z.getChildIndex(v.getBoardContainer()) + 1)
    };
    this.moveBall = function () {
        if (!0 !== n.isStopped()) {
            var a = n.vCurForce();
            a.addV(F);
            n.vPos().addV(a);
            n.getY() < v.getY() &&
                !1 === q && (this.setNetInFront(), q = !0);
            !0 === this.checkPointIsInRectSquaresApprossimate() && (this.checkIfBallIsInBasket(), this.checkCollisionWithHoop());
            this.checkCollisionWithBonus();
            this.checkCollisionWithWalls();
            n.updateSpritePosition()
        }
    };
    this.checkCollisionWithHoop = function () {
        if (!1 !== q) {
            var a = !1;
            n.getX() < v.getX() ? !0 === this.checkForBoardRingEdgeCollision(v.getBoardSideLeftPosition()) && (a = !0) : !0 === this.checkForBoardRingEdgeCollision(v.getBoardSideRightPosition()) && (a = !0);
            var b = v.getHoopSideEdges();
            if (n.getX() <
                v.getX()) {
                var c = {
                    p1: v.getHoopLeftSidePtA(),
                    p2: v.getHoopLeftSidePtB()
                };
                !0 === this.checkIfBallIsCollidingOnHoopSides(c) && (this.reflectBallOnBoard(b[EDGE_LEFT]), a = !0)
            } else c = {
                p1: v.getHoopRightSidePtA(),
                p2: v.getHoopRightSidePtB()
            }, !0 === this.checkIfBallIsCollidingOnHoopSides(c) && (this.reflectBallOnBoard(b[EDGE_RIGHT]), a = !0);
            return a
        }
    };
    this.checkCollisionWithBonus = function () {
        if (null !== B && !1 !== q) return !0 === this.checkIfBallIsCollidingWithBonus() && !1 === B.isBonusTaken() ? (playSound("bonus_taken", 1, !1), this.addScore(STAR_BONUS_POINTS, !0), B.onBonusTaken(), B = null, !0) : !1
    };
    this.checkIfBallIsCollidingWithBonus = function () {
        return n.getX() > B.getX() - B.getWidth() && n.getX() < B.getX() + B.getWidth() && n.getY() > B.getY() - B.getHeight() && n.getY() < B.getY() + B.getHeight() ? !0 : !1
    };
    this.checkIfBallIsInBasket = function () {
        !1 === t && !1 === w && (t = this.checkCollisionWithBasket(v.getBasketTop()));
        !0 === t && !1 === w && (w = this.checkCollisionWithBasket(v.getBasketBottom()));
        !0 === t && !0 === w && !1 === x && (this.moveHoop(), this.onScore(), x = !0)
    };
    this.checkCollisionWithBasket = function (a) {
        return collideEdgeWithCircle(a,
            n.vPos(), n.getRadius()) ? !0 : !1
    };
    this.onScore = function () {
        H = !1 === y ? BONUS_NO_COLLISIONS : NO_BONUS;
        playSound("score", 1, !1);
        this.addScore(BALL_POINTS * H, !1);
        !1 === y ? !1 === r ? r = !0 : m = !0 : r = m = !1;
        w = t = !1;
        k = !0
    };
    this.checkForBoardRingEdgeCollision = function (a) {
        if (this.checkDistanceBetweenTwoCircles(n.getX(), n.getY(), a.x, a.y) < n.getRadiusForCollisionRingEdge()) {
            !1 === soundPlaying("boing") && playSound("boing", 1, !1);
            y = !0;
            var b = new CVector2;
            b.set(a.x, a.y);
            a = new CVector2(n.getX(), n.getY());
            a.subtractV(b);
            a.normalize();
            a.scalarProduct(1.2 *
                (BOARD_SIDES_RADIUS + n.getRadiusForCollisionRingEdge()));
            a.addV(b);
            O.updateObject(A);
            O._tremble();
            this.bounceBallOnRingEdge(a, b);
            return !0
        }
        return !1
    };
    this.bounceBallOnRingEdge = function (a, b) {
        var c = new CVector2(n.getX(), n.getY());
        c.subtractV(b);
        c.normalize();
        c.scalarProduct(n.vCurForce().length());
        n.setPosition(a.getX(), a.getY(), n.getZ());
        c.length() > BALL_FORCE_MINIMUM_LIMIT && c.scalarProduct(DAMPING_VARIABLE);
        n.setForce(c.getX(), c.getY())
    };
    this.checkIfBallIsCollidingOnHoopSides = function (a) {
        return circleDistFromLineSeg(n.getX(),
            n.getY(), a) < n.getRadiusWithTolerance() ? !0 : !1
    };
    this.reflectBallOnBoard = function (a) {
        var b = collideEdgeWithCircle(a, n.vPos(), n.getRadius());
        return b ? (this.bounceBallOnHoopSideEdge(b, a), y = !0, this.moveHoop(), !0) : !1
    };
    this.checkDistanceBetweenTwoCircles = function (a, b, c, d) {
        a -= c;
        b -= d;
        return Math.sqrt(a * a + b * b)
    };
    this.checkPointIsInRectSquaresApprossimate = function () {
        return n.getX() > v.getLimitLeft() && n.getX() < v.getLimitRight() && n.getY() > v.getLimitTop() && n.getY() < v.getLimitBottom() ? !0 : !1
    };
    this.getLives = function () {
        return M
    };
    this.checkCollisionWithWalls = function () {
        var a = !1;
        n.getX() > CANVAS_WIDTH - BALL_SIZE / 2 ? n.fadeOut() : n.getX() < 0 + BALL_SIZE / 2 && n.fadeOut();
        n.getX() > CANVAS_WIDTH ? (a = !0, n.stopBall(), this.resetTurn()) : 0 > n.getX() && (a = !0, n.fadeOut(), n.stopBall(), this.resetTurn());
        return a
    };
    this.bounceBallOnHoopSideEdge = function (a, b) {
        var c = new CVector2;
        c.setV(b.getNormal());
        c.scalarProduct(n.getRadiusWithTolerance());
        c.addV(a.closest_point);
        c = new CVector3(c.getX(), c.getY(), n.getZ());
        n.setPos(c);
        c = new CVector2(n.vCurForce().getX(),
            n.vCurForce().getY());
        reflectVectorV2(c, b.getNormal());
        c.scalarProduct(DAMPING_VARIABLE / 2);
        n.setForce(c.getX(), c.getY())
    };
    this.updateBoardHoopPosition = function () {
        A.x !== v.getX() && (A.x = v.getX());
        A.y !== v.getY() + BOARD_HOOP_Y_OFFSET && (A.y = v.getY() + BOARD_HOOP_Y_OFFSET)
    };
    this.setStartGame = function (a) {
        f = a
    };
    this.setNextTurn = function () {
        h = !0;
        this.resetTurnVariables();
        this.checkForBoardMovement();
        this.setNextStartPosition();
        this.resetNetZIndex();
        this.initNewStarBonus()
    };
    this.showNewBestScore = function () {
        !0 !==
            p && !0 !== s_bFirstTimePlaying && (E.visible = !0, !1 === soundPlaying("newbestscore") && playSound("newbestscore", 1, !1), (new createjs.Tween.get(E)).to({
                alpha: 1
            }, 500, createjs.Ease.quadIn).call(function () {
                (new createjs.Tween.get(E, {
                    loop: !0
                })).to({
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 1E3, createjs.Ease.quadOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 1E3, createjs.Ease.quadIn);
                (new createjs.Tween.get(E)).wait(2E3).to({
                    alpha: 0
                }, 1E3, createjs.Ease.quadOut).call(function () {
                    C.visible = !1
                })
            }))
    };
    this.showScoreBonus = function () {
        C.visible = !0;
        playSound("bonus",
            1, !1);
        (new createjs.Tween.get(C)).to({
            alpha: 1
        }, 250, createjs.Ease.quadIn).call(function () {
            (new createjs.Tween.get(C, {
                loop: !0
            })).to({
                scaleX: 1.2,
                scaleY: 1.2
            }, 1E3, createjs.Ease.quadOut).to({
                scaleX: 1,
                scaleY: 1
            }, 1E3, createjs.Ease.quadIn)
        })
    };
    this.hideScoreBonus = function () {
        C.visible = !1;
        createjs.Tween.removeTweens(C)
    };
    this.initNewStarBonus = function () {
        if (null === B && !(Math.floor(100 * Math.random()) > RANDOM_BONUS_OCCURRENCY)) {
            var a = z.getChildIndex(n.getContainer());
            B = new CBonus(CANVAS_WIDTH_HALF, CANVAS_HEIGHT_HALF -
                200, z, a)
        }
    };
    this.setNextStartPosition = function () {
        N.x = D < RANDOM_BALL_START_LIMIT ? CANVAS_WIDTH_HALF : Math.random() * (CANVAS_WIDTH - 100 - 100) + 100;
        n.resetPosition(N.x, L, 0)
    };
    this.resetTurn = function () {
        !1 === m ? this.hideScoreBonus() : this.showScoreBonus();
        !0 === k ? (this.setNextTurn(), n.setBonus(m)) : this.subtractPlayerLives()
    };
    this.subtractPlayerLives = function () {
        r = k = m = !1;
        n.setBonus(!1);
        this.hideScoreBonus();
        playSound("malus", 1, !1);
        M--;
        I.removeLife();
        0 < M ? this.setNextTurn() : (v.setUpdate(!1), this.gameOver())
    };
    this.checkForBallFadeOut =
        function () {
            !0 !== n.isStopped() && n.fadeOut()
        };
    this.update = function () {
        v.update();
        this.updateBoardHoopPosition();
        for (var a = 0; a < PHYSICS_ITERATIONS && !1 !== f && !1 !== h && !1 !== g; a++) {
            this.moveBall();
            if (n.getY() > L) {
                n.stopBall();
                this.resetTurn();
                break
            }!0 === q && n.getY() > BALL_LIMIT_FADEOUT && this.checkForBallFadeOut()
        }
    };
    s_oGame = this;
    BALL_POINTS = b.ball_points;
    BONUS_MULTIPLIER = b.bonus_multiplier;
    STAR_BONUS_POINTS = b.star_bonus_points;
    BONUS_NO_COLLISIONS = b.bonus_no_collision;
    RANDOM_BONUS_OCCURRENCY = b.random_bonus_occurrency;
    RANDOM_BALL_START_LIMIT = b.random_ball_start_limit;
    BOARD_HORIZONTAL_MOVEMENT_LIMIT = b.board_horizontal_movement_limit;
    BOARD_VERTICAL_MOVEMENT_LIMIT = b.board_vertical_movement_limit;
    PLAYER_LIVES = b.player_lives;
    this._init()
}
var s_oGame, s_oTweenController;

function CBall(b) {
    var a, d, c, e, f, h, g, l, k, r, m, t, w, q, y, x, p;
    this._init = function () {
        var b = s_oGame.getBallStartPosition(),
            h = b.x;
        b = b.y;
        a = h;
        d = b;
        x = y = q = !1;
        p = [];
        c = new createjs.Container;
        u.addChild(c);
        s_bMobile || (c.cursor = "pointer");
        var H = {
            images: [s_oSpriteLibrary.getSprite("ball"), s_oSpriteLibrary.getSprite("ball_bonus")],
            framerate: 20,
            frames: {
                width: BALL_SIZE,
                height: BALL_SIZE,
                regX: BALL_SIZE / 2,
                regY: BALL_SIZE / 2
            },
            animations: {
                idle: [0, 17, "idle"],
                bonus: [18, 35, "bonus"]
            }
        };
        H = new createjs.SpriteSheet(H);
        f = createSprite(H,
            "idle", BALL_SIZE / 2, BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
        c.addChild(f);
        c.x = h;
        c.y = b;
        this.resetBallAnimation();
        e = createBitmap(s_oSpriteLibrary.getSprite("ball_shadow"));
        e.regX = BALL_SIZE / 2;
        e.regY = -40;
        e.x = c.x;
        e.y = c.y;
        u.addChild(e);
        g = new CVector3;
        g.set(c.x, c.y, 0);
        l = new CVector3;
        l.set(0, 0, 0);
        r = .5 * BALL_SIZE;
        m = r * r;
        t = r * BALL_RADIUS_TOLERANCE_FACTOR;
        w = r + BOARD_SIDES_RADIUS;
        k = new CVector3(0, 0, 0)
    };
    this.shadowFadeOut = function () {
        createjs.Tween.get(e).to({
            alpha: 0
        }, 200, createjs.Ease.quadOut)
    };
    this.resetBallAnimation = function () {
        !0 ===
            x ? f.gotoAndStop("bonus") : f.gotoAndStop("idle")
    };
    this.startBallAnimation = function () {
        !0 === x ? f.gotoAndPlay("bonus") : f.gotoAndPlay("idle")
    };
    this.unload = function () {
        u.removeChild(c)
    };
    this.setVisible = function (a) {
        c.visible = a
    };
    this.setPosition = function (a, b) {
        c.x = a;
        c.y = b
    };
    this.resetPos = function () {
        c.x = a;
        c.y = d;
        g.set(c.x, c.y);
        k.set(0, 0, 0);
        this.updateSpriteScale();
        this.resetBallAnimation()
    };
    this.isLaunched = function () {
        return q
    };
    this.setLaunched = function (a) {
        q = a
    };
    this.setBonus = function (a) {
        x = a
    };
    this.isStopped = function () {
        return y
    };
    this.stopBall = function () {
        q = !1;
        y = !0;
        k.set(0, 0, 0);
        this.resetBallAnimation()
    };
    this.fadeOut = function () {
        createjs.Tween.get(c).to({
            alpha: 0
        }, 250, createjs.Ease.sineOut)
    };
    this.resetPosition = function (a, b, d) {
        var e = this;
        createjs.Tween.get(c).to({
            alpha: 0
        }, 250, createjs.Ease.sineOut).call(function () {
            e.resetBallPosition(a, b, d);
            e.fadeIn()
        })
    };
    this.setStopped = function (a) {
        y = a
    };
    this.resetBallPosition = function (a, b, d) {
        g.set(a, b, d);
        c.x = g.getX();
        c.y = b;
        this.updateSpriteScale();
        createjs.Tween.removeTweens(this.getContainer());
        this.setStopped(!1);
        this.resetBallAnimation()
    };
    this.fadeIn = function () {
        this.resetBallAnimation();
        c.scaleX = c.scaleY = 1;
        e.x = c.x;
        e.y = c.y;
        createjs.Tween.get(c).wait(200).to({
            alpha: 1
        }, 250, createjs.Ease.sineOut);
        createjs.Tween.get(e).wait(200).to({
            alpha: 1
        }, 250, createjs.Ease.sineOut)
    };
    this.getRadiusForCollisionRingEdge = function () {
        return w * f.scaleX
    };
    this.getContainer = function () {
        return c
    };
    this.getX = function () {
        return c.x
    };
    this.getY = function () {
        return c.y
    };
    this.getZ = function () {
        return g.getZ()
    };
    this.getRadiusWithTolerance =
        function () {
            return t * f.scaleX
        };
    this.setUserData = function (a) {
        h = a
    };
    this.getUserData = function () {
        return h
    };
    this.vCurForce = function () {
        return k
    };
    this.vPos = function () {
        return g
    };
    this.setPos = function (a) {
        g.setV(a)
    };
    this.setForce = function (a, b) {
        k.set(a, b, k.getZ())
    };
    this.vPrevPos = function () {
        return l
    };
    this.getRadius = function () {
        return r * f.scaleX
    };
    this.getSquareRadius = function () {
        return m * f.scaleX
    };
    this.updateSpritePosition = function () {
        c.x = g.getX();
        c.y = g.getY();
        this.updateSpriteMovement();
        !0 === x && this.addBallParticle()
    };
    this.updateSpriteMovement = function () {
        f.framerate = 1.2 * k.length();
        0 < this.getZ() && this.updateSpriteScale()
    };
    this.addBallParticle = function () {
        if (!(1 > c.alpha)) {
            var a = Math.floor(Math.random() * PARTICLE_COLOR.length),
                b = BALL_SIZE / 4,
                d = new createjs.Shape;
            d.graphics.beginFill(PARTICLE_COLOR[a]).drawCircle(0, 0, b);
            d.regX = d.regY = b / 2;
            d.x = c.x;
            d.y = c.y;
            d.alpha = .2;
            u.addChildAt(d, u.getChildIndex(c));
            p.push(d);
            createjs.Tween.get(d).to({
                alpha: 0
            }, 500, createjs.Ease.quadIn).call(function () {
                createjs.Tween.removeTweens(u);
                u.removeChild(d);
                d = null
            })
        }
    };
    this.updateSpriteScale = function () {
        var a = this.getZ();
        a > BALL_SCALE_MAX_LIMIT && (a = BALL_SCALE_MAX_LIMIT);
        c.scaleX = c.scaleY = 1 - 100 / BALL_SCALE_MAX_LIMIT * a / 100 * BALL_SCALE_VARIABLE_MIN
    };
    var u = b;
    this._init();
    return this
}

function CBonus(b, a, d, c) {
    var e, f, h, g;
    this._init = function () {
        f = b;
        h = a;
        g = !1;
        var d = s_oSpriteLibrary.getSprite("bonus");
        e = createBitmap(d, d.width, d.height);
        e.regX = d.width / 2;
        e.regY = d.height / 2;
        e.width = d.width;
        e.height = d.height;
        e.x = f;
        e.y = h;
        l.addChildAt(e, c);
        createjs.Tween.get(e, {
            loop: !0
        }).to({
            y: h - 50
        }, 1E3, createjs.Ease.quadOut).to({
            y: h
        }, 1E3, createjs.Ease.quadIn)
    };
    this.getX = function () {
        return e.x
    };
    this.getY = function () {
        return e.y
    };
    this.getWidth = function () {
        return e.width
    };
    this.getHeight = function () {
        return e.height
    };
    this.isBonusTaken = function () {
        return g
    };
    this.onBonusTaken = function () {
        g = !0;
        createjs.Tween.removeTweens(e);
        createjs.Tween.get(e).to({
            y: 0,
            alpha: 0
        }, 1E3, createjs.Ease.quadOut).call(this.unload)
    };
    this.unload = function () {
        createjs.Tween.removeTweens(e);
        l.removeChild(e)
    };
    var l = d;
    this._init();
    return this
}

function CBoard(b) {
    var a, d, c, e, f, h, g, l, k, r, m, t, w, q, y, x, p, u, D, L, H, M, z, I, P, J, N, n, v, A, B, C, E, O, F, G, Q, K;
    this._init = function () {
        K = A = !1;
        n = [];
        v = [];
        Q = 0;
        k = new createjs.Container;
        R.addChild(k);
        u = {
            x: CANVAS_WIDTH_HALF,
            y: CANVAS_HEIGHT_HALF - 200
        };
        var a = s_oSpriteLibrary.getSprite("board");
        r = createBitmap(a, a.width, a.height);
        r.regX = a.width / 2;
        r.regY = a.height / 2;
        k.addChild(r);
        k.x = u.x;
        k.y = u.y;
        this.initHoopSides();
        this.initBoardSides();
        this.initBasketLogic();
        this.createExcludeCollisionRectangle();
        E = k.x;
        O = k.y;
        B = 0;
        C = BOARD_MOVEMENT_DURATION
    };
    this.initHoopSides = function () {
        g = -80;
        l = 60;
        f = -65;
        h = 190;
        c = 80;
        e = 60;
        a = 65;
        d = 190;
        w = new createjs.Shape;
        w.graphics.setStrokeStyle(5).beginStroke("red");
        w.graphics.moveTo(g, l);
        w.graphics.lineTo(f, h);
        w.graphics.endStroke();
        q = new createjs.Shape;
        q.graphics.setStrokeStyle(5).beginStroke("red");
        q.graphics.moveTo(c, e);
        q.graphics.lineTo(a, d);
        q.graphics.endStroke();
        w.visible = q.visible = !1;
        k.addChild(w, q);
        this.initHoopSidesEdges()
    };
    this.initHoopSidesEdges = function () {
        y = new CEdge(this.getHoopLeftSidePtB().x, this.getHoopLeftSidePtB().y,
            this.getHoopLeftSidePtA().x, this.getHoopLeftSidePtA().y, 10, !1);
        x = new CEdge(this.getHoopRightSidePtA().x, this.getHoopRightSidePtA().y, this.getHoopRightSidePtB().x, this.getHoopRightSidePtB().y, 10, !1);
        v[EDGE_LEFT] = y.getModel();
        v[EDGE_RIGHT] = x.getModel()
    };
    this.getHoopLeftSidePtA = function () {
        return {
            x: k.x + g,
            y: k.y + l
        }
    };
    this.getHoopLeftSidePtB = function () {
        return {
            x: k.x + f,
            y: k.y + h
        }
    };
    this.getHoopRightSidePtA = function () {
        return {
            x: k.x + c,
            y: k.y + e
        }
    };
    this.getHoopRightSidePtB = function () {
        return {
            x: k.x + a,
            y: k.y + d
        }
    };
    this.getHoopSideEdges =
        function () {
            return v
        };
    this.initBasketLogic = function () {
        var a = k.y + 50,
            b = k.x - 40,
            c = k.x + 40,
            d = k.y + 180;
        D = new CEdge(k.x - 60, a, k.x + 60, a, 10, !1);
        L = new CEdge(b, d, c, d, 10, !1)
    };
    this.initBoardSides = function () {
        H = -82;
        M = -1 * H;
        z = 52;
        m = new createjs.Shape;
        m.graphics.beginFill("blue");
        m.graphics.drawCircle(H, z, BOARD_SIDES_SIZE);
        m.graphics.endStroke();
        k.addChild(m);
        n[EDGE_LEFT] = m;
        t = new createjs.Shape;
        t.graphics.beginFill("blue");
        t.graphics.drawCircle(M, z, BOARD_SIDES_SIZE);
        t.graphics.endStroke();
        k.addChild(t);
        n[EDGE_RIGHT] = t;
        m.visible = t.visible = !1
    };
    this.createExcludeCollisionRectangle = function () {
        p = new createjs.Shape;
        p.graphics.beginFill("white");
        p.graphics.drawRect(0, 0, 400, 300);
        p.graphics.endFill();
        p.alpha = .1;
        p.x = -200;
        p.y = -100;
        p.width = 400;
        p.height = 300;
        p.visible = !1;
        k.addChild(p);
        this.setExcludeCollisionRectangleLimits()
    };
    this.setExcludeCollisionRectangleLimits = function () {
        I = k.x + p.x;
        P = k.x + p.x + p.width;
        J = k.y + p.y;
        N = k.y + p.y + p.height
    };
    this.destroyCollisions = function () {
        for (var a = 0; a < n.length; a++) k.removeChild(n[a]);
        n = [];
        for (a =
            0; a < v.length; a++) v[a].destroy();
        v = [];
        D.destroy();
        L.destroy();
        k.removeChild(p);
        p = null
    };
    this.getLimitLeft = function () {
        return I
    };
    this.getLimitRight = function () {
        return P
    };
    this.getLimitTop = function () {
        return J
    };
    this.getLimitBottom = function () {
        return N
    };
    this.getBoardRingEdges = function () {
        return n
    };
    this.getBoardSideLeftPosition = function () {
        return {
            x: k.x + H,
            y: k.y + z
        }
    };
    this.getBoardSideRightPosition = function () {
        return {
            x: k.x + M,
            y: k.y + z
        }
    };
    this.getStartPosition = function () {
        return u
    };
    this.getX = function () {
        return k.x
    };
    this.getY =
        function () {
            return k.y
        };
    this.setUpdate = function (a) {
        A = a
    };
    this.getBasketTop = function () {
        return D.getModel()
    };
    this.getBasketBottom = function () {
        return L.getModel()
    };
    this.isUpdate = function () {
        return A
    };
    this.getBoardContainer = function () {
        return k
    };
    this.resetBoardPhysicSimulation = function () {
        this.destroyCollisions();
        this.initBoardSides();
        this.initBasketLogic();
        this.createExcludeCollisionRectangle();
        this.initHoopSidesEdges()
    };
    this.setBoardHorizontalMovement = function (a) {};
    this.setBoardVerticalMovement = function (a) {
        K =
            a
    };
    this.resetBoardMovement = function () {
        var a = BOARD_MOVEMENT_HORIZONTAL,
            b = BOARD_MOVEMENT_VERTICAL;
        E = k.x;
        O = k.y;
        F = u.x;
        G = u.y;
        switch (Q) {
            case 0:
                F = u.x + a;
                !0 === K && (G = u.y + b);
                break;
            case 1:
                F = u.x;
                !0 === K && (G = u.y);
                break;
            case 2:
                F = u.x - a;
                !0 === K && (G = u.y - b);
                break;
            case 3:
                F = u.x;
                !0 === K && (G = u.y);
                break;
            case 4:
                F = u.x + a;
                !0 === K && (G = u.y - b);
                break;
            case 5:
                F = u.x;
                !0 === K && (G = u.y);
                break;
            case 6:
                F = u.x - a;
                !0 === K && (G = u.y + b);
                break;
            case 7:
                F = u.x;
                !0 === K && (G = u.y);
                break;
            default:
                Q = 0
        }
        B = 0;
        A = !0
    };
    this.update = function () {
        if (A)
            if (B += s_iTimeElaps, B >= C) A = !1, Q++, 7 < Q && (Q = 0), this.resetBoardMovement();
            else {
                var a = s_oTweenController.easeLinear(B, 0, 1, C),
                    b = s_oTweenController.easeLinear(B, 0, 1, C);
                a = s_oTweenController.tweenValue(E, F, a);
                b = s_oTweenController.tweenValue(O, G, b);
                k.x = a;
                k.y = b;
                this.resetBoardPhysicSimulation()
            }
    };
    var R = b;
    this._init();
    return this
}

function CToggle(b, a, d, c, e) {
    var f, h, g, l, k;
    this._init = function (a, b, c, d, e) {
        k = void 0 !== e ? e : s_oStage;
        h = [];
        g = [];
        e = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        f = d;
        l = createSprite(e, "state_" + f, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        l.x = a;
        l.y = b;
        l.stop();
        s_bMobile || (l.cursor = "pointer");
        k.addChild(l);
        this._initListener()
    };
    this.unload = function () {
        l.off("mousedown", this.buttonDown);
        l.off("pressup",
            this.buttonRelease);
        k.removeChild(l)
    };
    this._initListener = function () {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, b, c) {
        h[a] = b;
        g[a] = c
    };
    this.setCursorType = function (a) {
        l.cursor = a
    };
    this.setActive = function (a) {
        f = a;
        l.gotoAndStop("state_" + f)
    };
    this.buttonRelease = function () {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("click", 1, !1);
        f = !f;
        l.gotoAndStop("state_" + f);
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(g[ON_MOUSE_UP], f)
    };
    this.buttonDown = function () {
        l.scaleX = .9;
        l.scaleY =
            .9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    };
    this.setPosition = function (a, b) {
        l.x = a;
        l.y = b
    };
    this._init(b, a, d, c, e)
}

function CGfxButton(b, a, d, c) {
    var e, f, h, g, l, k, r, m, t;
    this._init = function (a, b, c) {
        e = !1;
        f = [];
        h = [];
        l = [];
        g = createBitmap(c);
        g.x = a;
        g.y = b;
        r = k = 1;
        g.regX = c.width / 2;
        g.regY = c.height / 2;
        s_bMobile || (g.cursor = "pointer");
        w.addChild(g);
        this._initListener()
    };
    this.getSprite = function () {
        return g
    };
    this.unload = function () {
        g.off("mousedown", m);
        g.off("pressup", t);
        w.removeChild(g)
    };
    this.setVisible = function (a) {
        g.visible = a
    };
    this.setCursorType = function (a) {
        g.cursor = a
    };
    this._initListener = function () {
        m = g.on("mousedown", this.buttonDown);
        t = g.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function (a, b, c) {
        f[a] = b;
        h[a] = c
    };
    this.addEventListenerWithParams = function (a, b, c, d) {
        f[a] = b;
        h[a] = c;
        l[a] = d
    };
    this.enable = function () {
        e = !1
    };
    this.disable = function () {
        e = !0
    };
    this.buttonRelease = function () {
        e || (g.scaleX = 0 < k ? 1 : -1, g.scaleY = 1, playSound("click", 1, !1), f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(h[ON_MOUSE_UP], l[ON_MOUSE_UP]))
    };
    this.buttonDown = function () {
        e || (g.scaleX = 0 < k ? .9 : -.9, g.scaleY = .9, f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], l[ON_MOUSE_DOWN]))
    };
    this.rotation = function (a) {
        g.rotation = a
    };
    this.getButton = function () {
        return g
    };
    this.setPosition = function (a, b) {
        g.x = a;
        g.y = b
    };
    this.setX = function (a) {
        g.x = a
    };
    this.setY = function (a) {
        g.y = a
    };
    this.getButtonImage = function () {
        return g
    };
    this.setScaleX = function (a) {
        k = g.scaleX = a
    };
    this.getX = function () {
        return g.x
    };
    this.getY = function () {
        return g.y
    };
    this.pulseAnimation = function () {
        createjs.Tween.get(g).to({
            scaleX: .9 * k,
            scaleY: .9 * r
        }, 850, createjs.Ease.quadOut).to({
            scaleX: k,
            scaleY: r
        }, 650, createjs.Ease.quadIn).call(function () {
            q.pulseAnimation()
        })
    };
    this.trebleAnimation = function () {
        createjs.Tween.get(g).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function () {
            q.trebleAnimation()
        })
    };
    this.removeAllTweens = function () {
        createjs.Tween.removeTweens(g)
    };
    var w = void 0 !== c ? c : s_oStage;
    this._init(b, a, d);
    var q = this;
    return this
}

function CInterface(b) {
    var a, d, c, e, f, h, g, l, k, r, m = null,
        t = null,
        w, q, y, x, p, u;
    this._init = function () {
        x = b;
        g = new createjs.Container;
        x.addChild(g);
        u = [];
        p = new createjs.Container;
        x.addChild(p);
        var k = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH - k.width / 2 - 20;
        d = k.height / 2 + 10;
        w = new CGfxButton(a, d, k, g);
        w.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
            var q = s_oSpriteLibrary.getSprite("audio_icon");
            f = a - k.width / 2 - q.width / 4 - 10;
            h = d;
            l = new CToggle(f, h, q, s_bAudioActive,
                g);
            l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            c = 20 + q.width / 4;
            e = q.height / 2 + 10
        } else c = a - k.width - 10, e = d;
        k = window.document;
        q = k.documentElement;
        m = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
        t = k.exitFullscreen || k.mozCancelFullScreen || k.webkitExitFullscreen || k.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (m = !1);
        m && screenfull.enabled && (q = s_oSpriteLibrary.getSprite("but_fullscreen"), r = new CToggle(c, e, q, s_bFullscreen, g), r.addEventListener(ON_MOUSE_UP,
            this._onFullscreenRelease, this));
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.initInterfacesText = function () {
        k = CANVAS_HEIGHT - 250;
        y = new createjs.Text(TEXT_SCORE + " 0", "30px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        y.textAlign = "left";
        y.x = 60;
        y.textBaseline = "alphabetic";
        y.y = k;
        g.addChild(y);
        q = new createjs.Text(TEXT_BEST + " " + s_iBestScore, "30px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        q.textAlign = "right";
        q.x = CANVAS_WIDTH - 60;
        q.textBaseline = "alphabetic";
        q.y = k;
        g.addChild(q);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function (b, g) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(f - b, h + g);
        m && screenfull.enabled && r.setPosition(c + b, e + g);
        w.setPosition(a - b, d + g);
        k = CANVAS_HEIGHT - g - 50;
        void 0 !== y && (y.y = k);
        void 0 !== q && (q.y = k);
        void 0 !== p && (p.y = k - 10)
    };
    this.refreshScoreText = function (a) {
        y.text = TEXT_SCORE + " " + a
    };
    this.refreshBestScoreText = function () {
        q.text = TEXT_BEST + " " + s_iBestScore
    };
    this.unload = function () {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) l.unload(), l = null;
        m && screenfull.enabled && r.unload();
        w.unload();
        s_oInterface = null;
        s_oGame._bDisableEvents = !1;
        s_oGame.setStartGame(!0)
    };
    this._onExit = function () {
        new CAreYouSurePanel(g);
        s_oGame._bDisableEvents = !0;
        s_oGame.setStartGame(!1)
    };
    this.updatePlayerLives = function () {
        for (var a = s_oGame.getLives(), b = 0; b < a; b++) {
            var c = s_oSpriteLibrary.getSprite("player_life");
            c = createBitmap(c, c.width, c.height);
            c.x = 1.1 * PLAYER_LIFE_SIZE * b;
            p.addChild(c);
            u.push(c)
        }
        0 !== a && this.resizePlayerLivesContainer()
    };
    this.resizePlayerLivesContainer = function () {
        var a = p.getBounds();
        p.x =
            CANVAS_WIDTH_HALF;
        p.y = k - 10;
        p.regX = a.width / 2;
        p.regY = a.height / 2
    };
    this.removeLife = function () {
        if (0 !== u.length) {
            var a = s_oGame.getLives();
            createjs.Tween.get(u[a]).to({
                alpha: 0
            }, 500, createjs.Ease.cubicOut).call(function () {
                p.removeAllChildren();
                u = [];
                s_oInterface.updatePlayerLives()
            })
        }
    };
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onFullscreenRelease = function () {
        s_bFullscreen ? t.call(window.document) : m.call(window.document.documentElement);
        sizeHandler()
    };
    this.resetFullscreenBut =
        function () {
            m && screenfull.enabled && r.setActive(s_bFullscreen)
        };
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;

function CCreditsPanel() {
    var b, a, d, c, e, f, h, g, l, k;
    this._init = function () {
        var r = s_oSpriteLibrary.getSprite("msg_box");
        g = new createjs.Container;
        s_oStage.addChild(g);
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, 2 * CANVAS_HEIGHT);
        e.alpha = 0;
        g.addChild(e);
        createjs.Tween.get(e).to({
            alpha: .7
        }, 500);
        k = CANVAS_HEIGHT + r.height / 2;
        l = new createjs.Container;
        l.y = k;
        g.addChild(l);
        b = createBitmap(r);
        b.regX = r.width / 2;
        b.regY = r.height / 2;
        b.x = CANVAS_WIDTH_HALF;
        b.y = CANVAS_HEIGHT_HALF;
        l.addChild(b);
        f = new createjs.Shape;
        f.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = .01;
        f.on("click", this._onLogoButRelease);
        l.addChild(f);
        s_bMobile || (f.cursor = "pointer");
        r = s_oSpriteLibrary.getSprite("but_exit");
        d = new CGfxButton(605, 572, r, l);
        d.addEventListener(ON_MOUSE_UP, this.unload, this);
        c = new createjs.Text(TEXT_CREDITS_DEVELOPED, "36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        c.textAlign = "center";
        c.textBaseline = "alphabetic";
        c.x = CANVAS_WIDTH_HALF;
        c.y = CANVAS_HEIGHT_HALF - 80;
        l.addChild(c);
        r = s_oSpriteLibrary.getSprite("logo_ctl");
        a = createBitmap(r);
        a.regX = r.width / 2;
        a.regY = r.height / 2;
        a.x = CANVAS_WIDTH_HALF;
        a.y = CANVAS_HEIGHT_HALF;
        l.addChild(a);
        h = new createjs.Text("www.codethislab.com", "36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        h.textAlign = "center";
        h.textBaseline = "alphabetic";
        h.x = CANVAS_WIDTH_HALF;
        h.y = CANVAS_HEIGHT_HALF + 100;
        l.addChild(h);
        createjs.Tween.get(l).to({
            y: 0
        }, 1E3, createjs.Ease.backOut)
    };
    this.unload = function () {
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(g).to({
                y: k
            },
            400, createjs.Ease.backIn).call(function () {
            f.off("click", this._onLogoButRelease);
            d.unload();
            d = null;
            s_oStage.removeChild(g);
            s_oMenu.exitFromCredits()
        })
    };
    this._onLogoButRelease = function () {
        // window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
    };
    this._init()
}

function CAreYouSurePanel() {
    var b, a, d, c, e, f;
    this._init = function () {
        a = new createjs.Container;
        s_oStage.addChild(a);
        f = new createjs.Container;
        s_oStage.addChild(f);
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function () {});
        a.addChild(e);
        createjs.Tween.get(e).to({
            alpha: .7
        }, 500);
        var g = s_oSpriteLibrary.getSprite("msg_box"),
            h = createBitmap(g);
        h.regX = g.width / 2;
        h.regY = g.height / 2;
        h.x = CANVAS_WIDTH_HALF;
        h.y = CANVAS_HEIGHT_HALF;
        f.addChild(h);
        f.y = CANVAS_HEIGHT + g.height / 2;
        b = f.y;
        createjs.Tween.get(f).to({
            y: 0
        }, 1E3, createjs.Ease.backOut);
        g = new createjs.Text(TEXT_ARE_SURE, " 36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        g.x = CANVAS_WIDTH_HALF;
        g.y = CANVAS_HEIGHT_HALF - 130;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineWidth = 500;
        f.addChild(g);
        d = new CGfxButton(CANVAS_WIDTH_HALF + 190, 780, s_oSpriteLibrary.getSprite("but_yes"), f);
        d.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        c = new CGfxButton(CANVAS_WIDTH_HALF - 190, 780, s_oSpriteLibrary.getSprite("but_no"),
            f);
        c.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this._onButYes = function () {
        c.disable();
        d.disable();
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(f).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function () {
            h.unload();
            s_oGame.onExit()
        })
    };
    this._onButNo = function () {
        c.disable();
        d.disable();
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(f).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function () {
            h.unload()
        })
    };
    this.unload = function () {
        c.unload();
        d.unload();
        s_oGame._bDisableEvents = !1;
        s_oGame.setStartGame(!0);
        a.removeChild(e);
        s_oStage.removeChild(f);
        e.off("mousedown", function () {})
    };
    var h = this;
    this._init()
}

function CHelpPanel() {
    var b, a, d, c, e, f, h, g;
    this._init = function () {
        g = !1;
        a = new createjs.Container;
        s_oStage.addChild(a);
        d = new createjs.Container;
        s_oStage.addChild(d);
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0;
        h.on("mousedown", function () {});
        a.addChild(h);
        createjs.Tween.get(h).to({
            alpha: .7
        }, 500);
        var c = s_oSpriteLibrary.getSprite("msg_box"),
            e = createBitmap(c);
        e.regX = c.width / 2;
        e.regY = c.height / 2;
        e.x = CANVAS_WIDTH_HALF;
        e.y = CANVAS_HEIGHT_HALF;
        d.addChild(e);
        d.y = CANVAS_HEIGHT + c.height / 2;
        b = d.y;
        createjs.Tween.get(d).to({
            y: 0
        }, 1E3, createjs.Ease.backOut);
        this.initText();
        var f = this;
        d.on("pressup", function () {
            f._onExitHelp()
        });
        a.on("pressup", function () {
            f._onExitHelp()
        });
        s_oGame._bDisableEvents = !0;
        s_bMobile || (d.cursor = "pointer")
    };
    this.initText = function () {
        var a = CANVAS_WIDTH_HALF,
            b = CANVAS_HEIGHT_HALF - 125,
            g = CANVAS_HEIGHT_HALF - 25,
            h = CANVAS_HEIGHT_HALF + 75;
        c = new createjs.Text(TEXT_HELP1, " 32px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.lineWidth = 450;
        c.x = a;
        c.y = b;
        e = new createjs.Text(TEXT_HELP2, " 32px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        e.textAlign = "center";
        e.textBaseline = "middle";
        e.lineWidth = 450;
        e.x = a;
        e.y = g;
        f = new createjs.Text(TEXT_HELP3, " 32px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        f.textAlign = "center";
        f.textBaseline = "middle";
        f.lineWidth = 450;
        f.x = a;
        f.y = h;
        d.addChild(c, e, f)
    };
    this.unload = function () {
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(d).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function () {
            s_oStage.removeChild(d);
            s_oGame._bDisableEvents = !1;
            var a = this;
            d.off("pressup", function () {
                a._onExitHelp()
            })
        })
    };
    this._onExitHelp = function () {
        !0 !== g && (g = !0, createjs.Tween.removeAllTweens(), this.unload(), s_oGame._onExitHelp())
    };
    this._init()
}

function CEndPanel(b) {
    var a, d, c, e, f, h, g, l, k, r;
    this._init = function () {
        r = b;
        d = new createjs.Container;
        s_oStage.addChild(d);
        c = new createjs.Container;
        s_oStage.addChild(c);
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function () {});
        d.addChild(e);
        createjs.Tween.get(e).to({
            alpha: .7
        }, 500);
        var m = s_oSpriteLibrary.getSprite("msg_box_big"),
            t = createBitmap(m);
        t.regX = m.width / 2;
        t.regY = m.height / 2;
        t.x = CANVAS_WIDTH_HALF;
        t.y = CANVAS_HEIGHT_HALF;
        c.addChild(t);
        c.y = CANVAS_HEIGHT + m.height / 2;
        a = c.y;
        createjs.Tween.get(c).to({
            y: 0
        }, 1E3, createjs.Ease.backOut).call(function () {
            $(s_oMain).trigger("show_interlevel_ad")
        });
        g = new createjs.Text(TEXT_GAMEOVER, "42px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        g.textAlign = "center";
        g.textBaseline = "alphabetic";
        g.x = CANVAS_WIDTH_HALF;
        g.y = CANVAS_HEIGHT_HALF - 160;
        g.lineWidth = 550;
        c.addChild(g);
        l = new createjs.Text(TEXT_SCORE + ": " + r, "36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x = CANVAS_WIDTH_HALF;
        l.y = CANVAS_HEIGHT_HALF - 40;
        l.lineWidth = 550;
        c.addChild(l);
        k = new createjs.Text(TEXT_BEST_SCORE + ": " + s_iBestScore, "36px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH_HALF;
        k.y = CANVAS_HEIGHT_HALF + 20;
        k.lineWidth = 550;
        c.addChild(k);
        f = new CGfxButton(CANVAS_WIDTH_HALF - 190, 830, s_oSpriteLibrary.getSprite("but_home"), c);
        f.addEventListener(ON_MOUSE_UP, this._onExit, this);
        h = new CGfxButton(CANVAS_WIDTH_HALF + 190, 830, s_oSpriteLibrary.getSprite("but_restart"), c);
        h.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        new CInterface(d)
    };
    this.unload = function () {
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(c).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function () {
            f.unload();
            h.unload();
            s_oStage.removeChild(d);
            s_oEndPanel = null
        })
    };
    this._onExit = function () {
        this.unload();
        s_oMain.gotoMenu()
    };
    this._onRestart = function () {
        this.unload();
        s_oGame.restart()
    };
    s_oEndPanel = this;
    this._init()
}
var s_oEndPanel = null;

function CMsgBox(b, a) {
    var d, c, e;
    this._init = function (a) {
        e = new createjs.Container;
        f.addChild(e);
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = .5;
        a.on("click", function () {});
        e.addChild(a);
        a = s_oSpriteLibrary.getSprite("msg_box_big");
        var b = createBitmap(a);
        b.x = .5 * CANVAS_WIDTH;
        b.y = .5 * CANVAS_HEIGHT;
        b.regX = .5 * a.width;
        b.regY = .5 * a.height;
        e.addChild(b);
        d = new createjs.Text(TEXT_ERR_LS, "26px " + PRIMARY_FONT, "#fff");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 - 190;
        d.textAlign =
            "center";
        d.textBaseline = "middle";
        d.lineWidth = 500;
        e.addChild(d);
        c = new CGfxButton(CANVAS_WIDTH / 2, 820, s_oSpriteLibrary.getSprite("but_yes"), e);
        c.addEventListener(ON_MOUSE_UP, this._onButOk, this)
    };
    this._onButOk = function () {
        this.unload()
    };
    this.unload = function () {
        c.unload();
        f.removeChild(e)
    };
    var f = a;
    this._init(b)
};