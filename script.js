document.addEventListener('DOMContentLoaded', () => {
    const fortuneButton = document.getElementById('fortune-button');
    const fortuneResult = document.getElementById('fortune-result');
    
    const fortunes = [
        {
            sign: "大吉大利，财运亨通！",
            explanation: "今日财运极佳，适合开展新业务或投资，贵人运势强，有望收获意外之财。"
        },
        {
            sign: "财源广进，生意兴隆！",
            explanation: "近期财运稳定上升，经商有利，注意把握机会，合理规划资金。"
        },
        {
            sign: "投资有道，收益可期！",
            explanation: "投资运势良好，但需谨慎评估风险，适合稳健型投资。"
        },
        {
            sign: "贵人相助，财运亨通！",
            explanation: "贵人运旺盛，多与贵人交际互动，可获得意想不到的财运机遇。"
        },
        {
            sign: "稳扎稳打，积累财富！",
            explanation: "适合稳健发展，不宜激进冒进，踏实工作必有回报。"
        }
    ];

    let lastClickTime = 0;
    const cooldownPeriod = 60000; // 60秒冷却时间

    fortuneButton.addEventListener('click', () => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastClickTime;
        
        if (timeElapsed < cooldownPeriod) {
            const remainingSeconds = Math.ceil((cooldownPeriod - timeElapsed) / 1000);
            fortuneResult.textContent = `请等待 ${remainingSeconds} 秒后再次求签`;
            return;
        }

        // 添加点击动画效果
        fortuneButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            fortuneButton.style.transform = 'scale(1)';
        }, 100);

        // 更新最后点击时间
        lastClickTime = currentTime;

        // 随机选择一个签文
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        // 添加打字机效果显示签文和解签
        fortuneResult.textContent = '';
        let fullText = `签文：${randomFortune.sign}\n\n解签：${randomFortune.explanation}`;
        let i = 0;
        
        const typeWriter = () => {
            if (i < fullText.length) {
                if (fullText.charAt(i) === '\n') {
                    fortuneResult.innerHTML += '<br>';
                } else {
                    fortuneResult.innerHTML += fullText.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    });

    // 添加音乐自动播放
    const bgMusic = document.getElementById('bgMusic');
    
    // 监听用户交互以开始播放音乐
    document.addEventListener('click', () => {
        bgMusic.play().catch(error => console.log("播放失败：", error));
    }, { once: true });

    // 金元宝动画
    const canvas = document.getElementById('goldCanvas');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas尺寸
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 金元宝类
    class GoldIngot {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -30;
            this.speed = 1 + Math.random() * 2;
            this.size = 20 + Math.random() * 20;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // 绘制金元宝
            ctx.beginPath();
            ctx.fillStyle = '#FFD700';
            ctx.moveTo(-this.size/2, 0);
            ctx.quadraticCurveTo(0, -this.size/2, this.size/2, 0);
            ctx.quadraticCurveTo(0, this.size/2, -this.size/2, 0);
            ctx.fill();
            
            ctx.restore();
        }
    }

    // 创建多个金元宝
    const goldIngots = Array.from({ length: 20 }, () => new GoldIngot());

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        goldIngots.forEach(ingot => {
            ingot.update();
            ingot.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
