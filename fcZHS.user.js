// ==UserScript==
// @name         修改视频播放速度并模拟鼠标移动和自动刷新网页
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  修改视频播放速度为指定倍速，并每5秒模拟鼠标移动和每10分钟自动刷新网页
// @author       你的名字
// @match        https://studyvideoh5.zhihuishu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 等待指定时间
    function waitForTimeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 等待元素出现
    function waitForSelector(selector) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);
        });
    }

    // 模拟鼠标移动
    function simulateMouseMove() {
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: Math.random() * window.innerWidth, clientY: Math.random() * window.innerHeight }));
    }

    // 每5秒模拟一次鼠标移动
    setInterval(simulateMouseMove, 5000);

    // 每10分钟刷新网页
    setInterval(() => {
        // location.reload();
    }, 600000); // 600000ms = 10分钟

    // 修改视频播放速度的函数
    async function videoOptimize(limitSpeed) {
        try {
            // 模拟鼠标移动
            simulateMouseMove();



            // 延迟5秒再修改倍速
            await waitForTimeout(5000);

            // 修改1.5倍速项为指定倍速
            const speedBox = await waitForSelector('.speedBox');
            speedBox.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            const maxSpeed = await waitForSelector('.speedTab15');
            maxSpeed.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

            // 修改1.5倍速项为指定倍速并触发事件
            const reviseSpeed = await waitForSelector('div[rate="1.5"]');
            reviseSpeed.setAttribute('rate', limitSpeed);

            // 触发点击事件以确保倍速变化生效
            reviseSpeed.click();
            maxSpeed.click();

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    // 在这里设置你想要的倍速
    const config = {
        limitSpeed: '1.0'
    };
   // 模拟鼠标移动
            simulateMouseMove();

   // videoOptimize(config.limitSpeed);

})();
