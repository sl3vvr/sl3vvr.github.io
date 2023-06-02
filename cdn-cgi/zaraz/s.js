(function(w, d) {
    zaraz.debug = (eX="")=>{
        document.cookie = `zarazDebug=${eX}; path=/`;
        location.reload()
    }
    ;
    window.zaraz._al = function(el, em, en) {
        w.zaraz.listeners.push({
            item: el,
            type: em,
            callback: en
        });
        el.addEventListener(em, en)
    }
    ;
    zaraz.preview = (eo="")=>{
        document.cookie = `zarazPreview=${eo}; path=/`;
        location.reload()
    }
    ;
    zaraz.i = function(eO) {
        const eP = d.createElement("div");
        eP.innerHTML = unescape(eO);
        const eQ = eP.querySelectorAll("script");
        for (let eR = 0; eR < eQ.length; eR++) {
            const eS = d.createElement("script");
            eQ[eR].innerHTML && (eS.innerHTML = eQ[eR].innerHTML);
            for (const eT of eQ[eR].attributes)
                eS.setAttribute(eT.name, eT.value);
            d.head.appendChild(eS);
            eQ[eR].remove()
        }
        d.body.appendChild(eP)
    }
    ;
    zaraz.f = async function(eU, eV) {
        const eW = {
            credentials: "include",
            keepalive: !0,
            mode: "no-cors"
        };
        if (eV) {
            eW.method = "POST";
            eW.body = new URLSearchParams(eV);
            eW.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return await fetch(eU, eW)
    }
    ;
    !function(eY, eZ, e_, fa, fb, fc) {
        function fd(ff, fg) {
            fc ? fa(ff, fg || 32) : fb.push(ff, fg)
        }
        function fe(fh, fi, fj, fk) {
            return fi && eZ.getElementById(fi) || (fk = eZ.createElement(fh || "SCRIPT"),
            fi && (fk.id = fi),
            fj && (fk.onload = fj),
            eZ.head.appendChild(fk)),
            fk || {}
        }
        fc = /p/.test(eZ.readyState),
        eY.addEventListener("on" + e_ in eY ? e_ : "load", (function() {
            for (fc = 1; fb[0]; )
                fd(fb.shift(), fb.shift())
        }
        )),
        fd._ = fe,
        eY.defer = fd,
        eY.deferscript = function(fl, fm, fn, fo) {
            fd((function() {
                fe("", fm, fo).src = fl
            }
            ), fn)
        }
    }(this, d, "pageshow", setTimeout, []);
    defer((function() {
        for (; zaraz.deferred.length; )
            zaraz.deferred.pop()();
        Object.defineProperty(zaraz.deferred, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...fp) {
                let fq = Array.prototype.push.apply(this, fp);
                for (; zaraz.deferred.length; )
                    zaraz.deferred.pop()();
                return fq
            }
        })
    }
    ), 5500);
    addEventListener("visibilitychange", (function() {
        for (; zaraz.deferred.length; )
            zaraz.deferred.pop()()
    }
    ));
    window.zaraz._p = async a=>new Promise((b=>{
        if (a) {
            a.e && a.e.forEach((c=>{
                try {
                    new Function(c)()
                } catch (d) {
                    console.error(`Error executing script: ${c}\n`, d)
                }
            }
            ));
            Promise.allSettled((a.f || []).map((e=>fetch(e[0], e[1]))))
        }
        b()
    }
    ));
    zaraz.pageVariables = {};
    zaraz.__zcl = {};
    zaraz.track = async function(es, et, eu) {
        return new Promise(((ev,ew)=>{
            const ex = {
                name: es,
                data: {}
            };
            for (const ey of [localStorage, sessionStorage])
                Object.keys(ey || {}).filter((eA=>eA.startsWith("_zaraz_"))).forEach((ez=>{
                    try {
                        ex.data[ez.slice(7)] = JSON.parse(ey.getItem(ez))
                    } catch {
                        ex.data[ez.slice(7)] = ey.getItem(ez)
                    }
                }
                ));
            Object.keys(zaraz.pageVariables).forEach((eB=>ex.data[eB] = JSON.parse(zaraz.pageVariables[eB])));
            Object.keys(zaraz.__zcl).forEach((eC=>ex.data[`__zcl_ ${eC}`] = zaraz.__zcl[eC]));
            ex.data.__zarazMCListeners = zaraz.__zarazMCListeners;
            //
            ex.data = {
                ...ex.data,
                ...et
            };
            ex.zarazData = zarazData;
            fetch("/cdn-cgi/zaraz/t", {
                credentials: "include",
                keepalive: !0,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ex)
            }).catch((()=>{
                //
                return fetch("/cdn-cgi/zaraz/t", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ex)
                })
            }
            )).then((function(eE) {
                zarazData._let = (new Date).getTime();
                eE.ok || ew();
                return 204 !== eE.status && eE.json()
            }
            )).then((async eD=>{
                await zaraz._p(eD);
                "function" == typeof eu && eu()
            }
            )).finally((()=>ev()))
        }
        ))
    }
    ;
    zaraz.set = function(eF, eG, eH) {
        try {
            eG = JSON.stringify(eG)
        } catch (eI) {
            return
        }
        prefixedKey = "_zaraz_" + eF;
        sessionStorage && sessionStorage.removeItem(prefixedKey);
        localStorage && localStorage.removeItem(prefixedKey);
        delete zaraz.pageVariables[eF];
        if (void 0 !== eG) {
            eH && "session" == eH.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, eG) : eH && "page" == eH.scope ? zaraz.pageVariables[eF] = eG : localStorage && localStorage.setItem(prefixedKey, eG);
            zaraz.__watchVar = {
                key: eF,
                value: eG
            }
        }
    }
    ;
    for (const {m: eJ, a: eK} of zarazData.q.filter((({m: eL})=>["debug", "set"].includes(eL))))
        zaraz[eJ](...eK);
    for (const {m: eM, a: eN} of zaraz.q)
        zaraz[eM](...eN);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function(cm, cn, co, cp) {
        zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
        zaraz.__zarazTriggerMap[cm] || (zaraz.__zarazTriggerMap[cm] = "");
        zaraz.__zarazTriggerMap[cm] += "*" + cn + "*";
        zaraz.track("__zarazEmpty", {
            ...co,
            __zarazClientTriggers: zaraz.__zarazTriggerMap[cm]
        }, cp)
    }
    ;
    window.dataLayer = w.dataLayer || [];
    zaraz._processDataLayer = fu=>{
        for (const fv of Object.entries(fu))
            zaraz.set(fv[0], fv[1], {
                scope: "page"
            });
        if (fu.event) {
            if (zarazData.dataLayerIgnore && zarazData.dataLayerIgnore.includes(fu.event))
                return;
            let fw = {};
            for (let fx of dataLayer.slice(0, dataLayer.indexOf(fu) + 1))
                fw = {
                    ...fw,
                    ...fx
                };
            delete fw.event;
            fu.event.startsWith("gtm.") || zaraz.track(fu.event, fw)
        }
    }
    ;
    const ft = w.dataLayer.push;
    Object.defineProperty(w.dataLayer, "push", {
        configurable: !0,
        enumerable: !1,
        writable: !0,
        value: function(...fy) {
            let fz = ft.apply(this, fy);
            zaraz._processDataLayer(fy[0]);
            return fz
        }
    });
    dataLayer.forEach((fA=>zaraz._processDataLayer(fA)));
    zaraz._cts = ()=>{
        zaraz._timeouts && zaraz._timeouts.forEach((br=>clearTimeout(br)));
        zaraz._timeouts = []
    }
    ;
    zaraz._rl = function() {
        w.zaraz.listeners && w.zaraz.listeners.forEach((bs=>bs.item.removeEventListener(bs.type, bs.callback)));
        window.zaraz.listeners = []
    }
    ;
    history.pushState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.pushState.apply(history, arguments);
            setTimeout((()=>{
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.__zarazMCListeners = {};
                zaraz.track("__zarazSPA")
            }
            ), 100)
        }
    }
    ;
    history.replaceState = function() {
        try {
            zaraz._rl();
            zaraz._cts && zaraz._cts()
        } finally {
            History.prototype.replaceState.apply(history, arguments);
            setTimeout((()=>{
                zarazData.l = d.location.href;
                zarazData.t = d.title;
                zaraz.pageVariables = {};
                zaraz.track("__zarazSPA")
            }
            ), 100)
        }
    }
    ;
    zaraz._p({
        "e": ["(function(w,d){w.zarazData.executed.push(\"Pageview\");w.zarazData.executed.push(\"ec8833fb-d2b3-4510-9c0a-cbc28391c037\");})(window,document)"]
    })
}
)(window, document);
