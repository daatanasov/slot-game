(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_28a984._.js", {

"[project]/src/app/custom-hooks/useSocket.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "useSocket": (()=>useSocket)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_refresh__.signature();
'use client';
;
;
const useSocket = (userId)=>{
    _s();
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [spinResult, setSpinResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSocket.useEffect": ()=>{
            // Create socket connection
            const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('http://localhost:8080', {
                query: {
                    userId
                }
            });
            // Connection event handlers
            newSocket.on('connect', {
                "useSocket.useEffect": ()=>{
                    setIsConnected(true);
                    console.log('Connected to WebSocket server');
                    // Join the slot game
                    newSocket.emit('join-slot-game', {
                        userId
                    });
                }
            }["useSocket.useEffect"]);
            newSocket.on('disconnect', {
                "useSocket.useEffect": ()=>{
                    setIsConnected(false);
                    console.log('Disconnected from WebSocket server');
                }
            }["useSocket.useEffect"]);
            // Game-specific event listeners
            newSocket.on('game-joined', {
                "useSocket.useEffect": (response)=>{
                    if (response.success) {
                        setGameState(response.gameState);
                    } else {
                        console.error('Failed to join game:', response.message);
                    }
                }
            }["useSocket.useEffect"]);
            newSocket.on('spin-result', {
                "useSocket.useEffect": (result)=>{
                    setSpinResult(result);
                }
            }["useSocket.useEffect"]);
            // Set the socket state
            setSocket(newSocket);
            // Cleanup on component unmount
            return ({
                "useSocket.useEffect": ()=>{
                    newSocket.disconnect();
                }
            })["useSocket.useEffect"];
        }
    }["useSocket.useEffect"], [
        userId
    ]);
    const spin = (betAmount)=>{
        if (socket && isConnected) {
            socket.emit('spin', betAmount);
        }
    };
    return {
        socket,
        gameState,
        spinResult,
        isConnected,
        spin
    };
};
_s(useSocket, "0tE3jti1hbUcoF5AwY7Q1dsSiHQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/pages/games/SlotGame2.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "SlotGame": (()=>SlotGame),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$custom$2d$hooks$2f$useSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/custom-hooks/useSocket.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
const SlotGame = ()=>{
    _s();
    // Use a mock user ID - in real app, this would come from authentication
    const userId = 'user_123';
    const { gameState, spinResult, isConnected, spin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$custom$2d$hooks$2f$useSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])(userId);
    // Local state for bet amount
    const [betAmount, setBetAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    // Handle spin action
    const handleSpin = ()=>{
        if (isConnected && gameState) {
            // Validate bet amount
            if (betAmount < gameState.minBet || betAmount > gameState.maxBet) {
                alert(`Bet must be between ${gameState.minBet} and ${gameState.maxBet}`);
                return;
            }
            spin(betAmount);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-white mb-4",
                children: "Slot Machine"
            }, void 0, false, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `
          text-sm font-medium 
          ${isConnected ? 'text-green-500' : 'text-red-500'}
        `,
                    children: isConnected ? 'Connected' : 'Disconnected'
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            gameState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Balance: $",
                        gameState.balance
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                    lineNumber: 47,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 46,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center mb-4 text-4xl",
                children: spinResult?.reels ? spinResult.reels.map((symbol, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-2",
                        children: symbol
                    }, index, false, {
                        fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                        lineNumber: 55,
                        columnNumber: 25
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-500",
                    children: "Spin to play!"
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                    lineNumber: 60,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            spinResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
          mb-4 p-2 rounded 
          ${spinResult.isWin ? 'bg-green-200' : 'bg-red-200'}
        `,
                children: spinResult.isWin ? `You won $${spinResult.winnings}!` : `You lost $${Math.abs(spinResult.winnings || 0)}`
            }, void 0, false, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 66,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mr-2 text-white",
                        children: "Bet Amount:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        value: betAmount,
                        onChange: (e)=>setBetAmount(Number(e.target.value)),
                        min: gameState?.minBet,
                        max: gameState?.maxBet,
                        className: "w-20 p-2 rounded bg-gray-700 text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleSpin,
                disabled: !isConnected,
                className: `
          w-full p-3 rounded 
          ${isConnected ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}
        `,
                children: "Spin"
            }, void 0, false, {
                fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
                lineNumber: 92,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/games/SlotGame2.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, this);
};
_s(SlotGame, "hSVNbbcR92/UeBeW+TFAyt/w5ho=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$custom$2d$hooks$2f$useSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = SlotGame;
const __TURBOPACK__default__export__ = SlotGame;
var _c;
__turbopack_refresh__.register(_c, "SlotGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/slot-game/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_28a984._.js.map