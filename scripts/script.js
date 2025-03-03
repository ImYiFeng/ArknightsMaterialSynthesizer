const materialRank = {
    // T1
    '源岩': 1, '破损装置': 1, '酯原料': 1, '代糖': 1, '异铁碎片': 1, '双酮': 1,
    // T2
    '固源岩': 2, '装置': 2, '聚酸酯': 2, '糖': 2, '异铁': 2, '酮凝集': 2,
    // T3
    '环烃聚质': 3, '转质盐组': 3, '褐素纤维': 3, '化合切削液': 3, '半自然溶剂': 3,
    '晶体元件': 3, '炽合金': 3, '凝胶': 3, '扭转醇': 3, '轻锰矿': 3, '研磨石': 3,
    'RMA70-12': 3, '固源岩组': 3, '全新装置': 3, '聚酸酯组': 3, '糖组': 3,
    '异铁组': 3, '酮凝集组': 3,
    // T4
    '环烃预制体': 4, '转质盐聚块': 4, '固化纤维板': 4, '切削原液': 4, '精炼溶剂': 4,
    '晶体电路': 4, '炽合金块': 4, '聚合凝胶': 4, '白马醇': 4, '三水锰矿': 4,
    '五水研磨石': 4, 'RMA70-24': 4, '提纯源岩': 4, '改量装置': 4, '聚酸酯块': 4,
    '糖聚块': 4, '异铁块': 4, '酮阵列': 4,
    // T5
    '烧结核凝晶': 5, '晶体电子单元': 5, 'D32钢': 5, '双极纳米片': 5, '聚合剂': 5
};

const recipes = {
    '烧结核凝晶': {materials: {'转质盐聚块': 1, '切削原液': 1, '精炼溶剂': 2}, cost: 400, mood: 8},
    '晶体电子单元': {materials: {'晶体电路': 1, '聚合凝胶': 2, '炽合金块': 1}, cost: 400, mood: 8},
    'D32钢': {materials: {'三水锰矿': 1, '五水研磨石': 1, 'RMA70-24': 1}, cost: 400, mood: 8},
    '双极纳米片': {materials: {'改量装置': 1, '白马醇': 2}, cost: 400, mood: 8},
    '聚合剂': {materials: {'提纯源岩': 1, '异铁块': 1, '酮阵列': 1}, cost: 400, mood: 8},
    '转质盐聚块': {materials: {'转质盐组': 1, '半自然溶剂': 1, '糖组': 1}, cost: 300, mood: 4},
    '精炼溶剂': {materials: {'半自然溶剂': 1, '化合切削液': 1, '凝胶': 1}, cost: 300, mood: 4},
    '切削原液': {materials: {'化合切削液': 1, '晶体元件': 1, 'RMA70-12': 1}, cost: 300, mood: 4},
    '晶体电路': {materials: {'晶体元件': 2, '凝胶': 1, '炽合金': 1}, cost: 300, mood: 4},
    '炽合金块': {materials: {'全新装置': 1, '研磨石': 1, '炽合金': 1}, cost: 300, mood: 4},
    '聚合凝胶': {materials: {'异铁组': 1, '凝胶': 1, '炽合金': 1}, cost: 300, mood: 4},
    'RMA70-24': {materials: {'RMA70-12': 1, '固源岩组': 2, '酮凝集组': 1}, cost: 300, mood: 4},
    '五水研磨石': {materials: {'研磨石': 1, '异铁组': 1, '全新装置': 1}, cost: 300, mood: 4},
    '三水锰矿': {materials: {'轻锰矿': 2, '聚酸酯组': 1, '扭转醇': 1}, cost: 300, mood: 4},
    '白马醇': {materials: {'扭转醇': 1, '糖组': 1, 'RMA70-12': 1}, cost: 300, mood: 4},
    '装置': {materials: {'破损装置': 3}, cost: 100, mood: 1},
    '全新装置': {materials: {'装置': 4}, cost: 200, mood: 2},
    '改量装置': {materials: {'全新装置': 1, '固源岩组': 2, '研磨石': 1}, cost: 300, mood: 4},
    '酮凝集': {materials: {'双酮': 3}, cost: 100, mood: 1},
    '酮凝集组': {materials: {'酮凝集': 4}, cost: 200, mood: 2},
    '酮阵列': {materials: {'酮凝集组': 2, '糖组': 1, '轻锰矿': 1}, cost: 300, mood: 4},
    '异铁': {materials: {'异铁碎片': 3}, cost: 100, mood: 1},
    '异铁组': {materials: {'异铁': 4}, cost: 200, mood: 2},
    '异铁块': {materials: {'异铁组': 2, '全新装置': 1, '聚酸酯组': 1}, cost: 300, mood: 4},
    '聚酸酯': {materials: {'酯原料': 3}, cost: 100, mood: 1},
    '聚酸酯组': {materials: {'聚酸酯': 4}, cost: 200, mood: 2},
    '聚酸酯块': {materials: {'聚酸酯组': 2, '酮凝集组': 1, '扭转醇': 1}, cost: 300, mood: 4},
    '糖': {materials: {'代糖': 3}, cost: 100, mood: 1},
    '糖组': {materials: {'糖': 4}, cost: 200, mood: 2},
    '糖聚块': {materials: {'糖组': 2, '异铁组': 1, '轻锰矿': 1}, cost: 300, mood: 4},
    '固源岩': {materials: {'源岩': 3}, cost: 100, mood: 1},
    '固源岩组': {materials: {'固源岩': 5}, cost: 200, mood: 2},
    '提纯源岩': {materials: {'固源岩组': 4}, cost: 300, mood: 4}
};

// 状态管理变量
let currentMaterials = {};
const messageDuration = 3000;

// 导入数据
function importData() {
const jsonInput = document.getElementById('jsonInput');
const messageElement = document.getElementById('importMessage');
messageElement.style.opacity = 0;

    try {
        const jsonStr = jsonInput.value.trim();
        if (!jsonStr) throw new Error('请输入数据');
        
        const data = JSON.parse(jsonStr);
        if (data['@type'] !== '@penguin-statistics/depot') {
            throw new Error('数据格式不正确');
        }

        currentMaterials = data.items.reduce((acc, item) => {
            if (materialRank[item.name]) {
                acc[item.name] = item.have || 0;
            }
            return acc;
        }, {});

        showMessage(`✅ 成功导入${Object.keys(currentMaterials).length}项数据`, true);
        jsonInput.value = ''; // 清空输入框

    } catch (error) {
        showMessage(`❌ 错误：${error.message}`, false);
    }
}

// 显示消息函数
function showMessage(text, isSuccess) {
    const messageElement = document.getElementById('importMessage');
    messageElement.textContent = text;
    messageElement.style.color = isSuccess ? '#3a7bd5' : '#e74c3c';
    messageElement.style.backgroundColor = isSuccess ? 'rgba(58,123,213,0.1)' : 'rgba(231,76,60,0.1)';
    
    messageElement.style.opacity = 1;
    setTimeout(() => {
        messageElement.style.opacity = 0;
    }, messageDuration);
}

// 分析函数
function analyze() {
    if (Object.keys(currentMaterials).length === 0) {
        showMessage('⚠️ 请先导入库存数据', false);
        return;
    }
    const retention = {
        1: parseInt(document.getElementById('retention1').value) || 0,
        2: parseInt(document.getElementById('retention2').value) || 0,
        3: parseInt(document.getElementById('retention3').value) || 0,
        4: parseInt(document.getElementById('retention4').value) || 0
    };

    // 拷贝当前库存
    const materials = JSON.parse(JSON.stringify(currentMaterials));
    const steps = [];
    let totalCost = 0;
    let totalMood = 0;

    // 按等级从低到高处理
    [1, 2, 3, 4].forEach(currentRank => {
        const currentMats = Object.keys(materialRank)
            .filter(mat => materialRank[mat] === currentRank);

        currentMats.forEach(mat => {
            // 获取所有需要当前材料的配方
            const products = Object.keys(recipes)
                .filter(product => recipes[product].materials[mat]);

            // 按产品库存升序排序
            products.sort((a, b) => (materials[a] || 0) - (materials[b] || 0));

            products.forEach(product => {
                const recipe = recipes[product];
                const required = recipe.materials;

                // 计算最大可合成次数
                let minTimes = Infinity;
                Object.keys(required).forEach(rm => {
                    const rmRank = materialRank[rm] || 0;
                    const reserve = rmRank !== 0 ? retention[rmRank] || 0 : 0;
                    const current = materials[rm] || 0;
                    const available = Math.max(current - reserve, 0);
                    const times = Math.floor(available / required[rm]);
                    
                    if (times < minTimes) {
                        minTimes = times;
                    }
                });

                if (minTimes <= 0 || minTimes === Infinity) return;

                // 执行合成
                Object.keys(required).forEach(rm => {
                    materials[rm] = (materials[rm] || 0) - required[rm] * minTimes;
                });
                materials[product] = (materials[product] || 0) + minTimes;

                // 记录步骤
                const cost = recipe.cost * minTimes;
                const mood = recipe.mood * minTimes;
                steps.push({
                    product,
                    times: minTimes,
                    materials: {...required},
                    cost,
                    mood
                });
                totalCost += cost;
                totalMood += mood;
            });
        });
    });

    displayResult(steps, totalCost, totalMood);
}

// 结果显示
function displayResult(steps, totalCost, totalMood) {
    const resultContainer = document.getElementById('resultOutput');
    resultContainer.innerHTML = '';

    // 按等级分组（从低到高排序）
    const grouped = steps.reduce((acc, step) => {
        const rank = materialRank[step.product] || 0;
        if (rank >= 2) {
            if (!acc[rank]) acc[rank] = [];
            acc[rank].push(step);
        }
        return acc;
    }, {});

    // 按等级从低到高排序
    const sortedRanks = Object.keys(grouped).map(Number).sort((a, b) => a - b);
    
    // 卡片生成逻辑
    sortedRanks.forEach((rank, groupIndex) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'synthesis-group';
        groupDiv.innerHTML = `<h2>${['白色','绿色','蓝色','紫色','金色'][rank-1]}材料</h2>`;

        grouped[rank].forEach((step, index) => {
            const card = createResultCard(step);
            card.style.animation = `elementAppear 0.6s ease-out ${groupIndex * 0.3 + index * 0.1}s backwards`;
            groupDiv.appendChild(card);
        });

        resultContainer.appendChild(groupDiv);
    });

    // 总消耗显示
    const totalDiv = document.createElement('div');
    totalDiv.className = 'global-total';
    totalDiv.textContent = `🏷️ 总消耗：💰 ${totalCost} 龙门币 | ❤️ ${totalMood} 心情`;
    resultContainer.appendChild(totalDiv);
}

// 创建结果卡片组件
function createResultCard(step) {
    const card = document.createElement('div');
    card.className = 'synthesis-card';
    card.innerHTML = `
        <div class="card-header">
            <img src="pic/${step.product}.png" class="material-icon" 
                onerror="this.onerror=null;this.src='placeholder.png'">
            <h3>${step.product} ×${step.times}</h3>
        </div>
        <div class="material-list">
            ${Object.entries(step.materials).map(([mat, count]) => `
                <div class="material-item">
                    <img src="pic/${mat}.png" 
                        onerror="this.onerror=null;this.src='placeholder.png'">
                    <span>${count * step.times}</span>
                </div>
            `).join('')}
        </div>
        <div class="card-footer">
            <span class="cost">💰 ${step.cost}</span>
            <span class="mood">❤️ ${step.mood}</span>
        </div>
    `;
    return card;
}

// 添加滚动监听
window.addEventListener('scroll', () => {
    const header = document.querySelector('.neumorph-header');
    header.classList.toggle('scrolled-header', window.scrollY > 50);
});