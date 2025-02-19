import json
import tkinter as tk
from tkinter import messagebox

# 材料等级和合成配方数据
material_rank = {
    # T1
    '源岩': 1, '破损装置': 1, '酯原料': 1, '代糖': 1, '异铁碎片': 1, '双酮': 1,
    # T2
    '固源岩': 2, '装置': 2, '聚酸酯': 2, '糖': 2, '异铁': 2, '酮凝集': 2,
    # T3
    '环烃聚质': 3, '转质盐组': 3, '褐素纤维': 3, '化合切削液': 3, '半自然溶剂': 3,
    '晶体元件': 3, '炽合金': 3, '凝胶': 3, '扭转醇': 3, '轻锰矿': 3, '研磨石': 3,
    'RMA70-12': 3, '固源岩组': 3, '全新装置': 3, '聚酸酯组': 3, '糖组': 3,
    '异铁组': 3, '酮凝集组': 3,
    # T4
    '环烃预制体': 4, '转质盐聚块': 4, '固化纤维板': 4, '切削原液': 4, '精炼溶剂': 4,
    '晶体电路': 4, '炽合金块': 4, '聚合凝胶': 4, '白马醇': 4, '三水锰矿': 4,
    '五水研磨石': 4, 'RMA70-24': 4, '提纯源岩': 4, '改量装置': 4, '聚酸酯块': 4,
    '糖聚块': 4, '异铁块': 4, '酮阵列': 4,
    # T5
    '烧结核凝晶': 5, '晶体电子单元': 5, 'D32钢': 5, '双极纳米片': 5, '聚合剂': 5
}

recipes = {
    '烧结核凝晶': {'materials': {'转质盐聚块': 1, '切削原液': 1, '精炼溶剂': 2}, 'cost': 400, 'mood': 8},
    '晶体电子单元': {'materials': {'晶体电路': 1, '聚合凝胶': 2, '炽合金块': 1}, 'cost': 400, 'mood': 8},
    'D32钢': {'materials': {'三水锰矿': 1, '五水研磨石': 1, 'RMA70-24': 1}, 'cost': 400, 'mood': 8},
    '双极纳米片': {'materials': {'改量装置': 1, '白马醇': 2}, 'cost': 400, 'mood': 8},
    '聚合剂': {'materials': {'提纯源岩': 1, '异铁块': 1, '酮阵列': 1}, 'cost': 400, 'mood': 8},
    '转质盐聚块': {'materials': {'转质盐组': 1, '半自然溶剂': 1, '糖组': 1}, 'cost': 300, 'mood': 4},
    '精炼溶剂': {'materials': {'半自然溶剂': 1, '化合切削液': 1, '凝胶': 1}, 'cost': 300, 'mood': 4},
    '切削原液': {'materials': {'化合切削液': 1, '晶体元件': 1, 'RMA70-12': 1}, 'cost': 300, 'mood': 4},
    '晶体电路': {'materials': {'晶体元件': 2, '凝胶': 1, '炽合金': 1}, 'cost': 300, 'mood': 4},
    '炽合金块': {'materials': {'全新装置': 1, '研磨石': 1, '炽合金': 1}, 'cost': 300, 'mood': 4},
    '聚合凝胶': {'materials': {'异铁组': 1, '凝胶': 1, '炽合金': 1}, 'cost': 300, 'mood': 4},
    'RMA70-24': {'materials': {'RMA70-12': 1, '固源岩组': 2, '酮凝集组': 1}, 'cost': 300, 'mood': 4},
    '五水研磨石': {'materials': {'研磨石': 1, '异铁组': 1, '全新装置': 1}, 'cost': 300, 'mood': 4},
    '三水锰矿': {'materials': {'轻锰矿': 2, '聚酸酯组': 1, '扭转醇': 1}, 'cost': 300, 'mood': 4},
    '白马醇': {'materials': {'扭转醇': 1, '糖组': 1, 'RMA70-12': 1}, 'cost': 300, 'mood': 4},
    '装置': {'materials': {'破损装置': 3}, 'cost': 100, 'mood': 1},
    '全新装置': {'materials': {'装置': 4}, 'cost': 200, 'mood': 2},
    '改量装置': {'materials': {'全新装置': 1, '固源岩组': 2, '研磨石': 1}, 'cost': 300, 'mood': 4},
    '酮凝集': {'materials': {'双酮': 3}, 'cost': 100, 'mood': 1},
    '酮凝集组': {'materials': {'酮凝集': 4}, 'cost': 200, 'mood': 2},
    '酮阵列': {'materials': {'酮凝集组': 2, '糖组': 1, '轻锰矿': 1}, 'cost': 300, 'mood': 4},
    '异铁': {'materials': {'异铁碎片': 3}, 'cost': 100, 'mood': 1},
    '异铁组': {'materials': {'异铁': 4}, 'cost': 200, 'mood': 2},
    '异铁块': {'materials': {'异铁组': 2, '全新装置': 1, '聚酸酯组': 1}, 'cost': 300, 'mood': 4},
    '聚酸酯': {'materials': {'酯原料': 3}, 'cost': 100, 'mood': 1},
    '聚酸酯组': {'materials': {'聚酸酯': 4}, 'cost': 200, 'mood': 2},
    '聚酸酯块': {'materials': {'聚酸酯组': 2, '酮凝集组': 1, '扭转醇': 1}, 'cost': 300, 'mood': 4},
    '糖': {'materials': {'代糖': 3}, 'cost': 100, 'mood': 1},
    '糖组': {'materials': {'糖': 4}, 'cost': 200, 'mood': 2},
    '糖聚块': {'materials': {'糖组': 2, '异铁组': 1, '轻锰矿': 1}, 'cost': 300, 'mood': 4},
    '固源岩': {'materials': {'源岩': 3}, 'cost': 100, 'mood': 1},
    '固源岩组': {'materials': {'固源岩': 5}, 'cost': 200, 'mood': 2},
    '提纯源岩': {'materials': {'固源岩组': 4}, 'cost': 300, 'mood': 4}
}

class MaterialSynthesizer:
    def __init__(self, master):
        self.master = master
        master.title("明日方舟材料合成分析器")
        
        # 数据导入部分
        self.input_frame = tk.Frame(master)
        self.input_frame.pack(pady=5, fill=tk.X)
        
        tk.Label(self.input_frame, text="粘贴JSON数据:").pack(anchor=tk.W)
        self.text_input = tk.Text(self.input_frame, height=10, width=50)
        self.text_input.pack(fill=tk.BOTH, expand=True)
        
        self.import_btn = tk.Button(self.input_frame, text="导入数据", command=self.import_data)
        self.import_btn.pack(pady=5)
        
        # 保留设置
        self.retention_frame = tk.Frame(master)
        self.retention_frame.pack(pady=5)
        self.ret_vars = {}
        for i in range(1,5):
            frame = tk.Frame(self.retention_frame)
            frame.pack(pady=2)
            tk.Label(frame, text=f"保留T{i}数量:").pack(side=tk.LEFT)
            var = tk.IntVar(value=0)
            tk.Entry(frame, textvariable=var, width=8).pack(side=tk.LEFT)
            self.ret_vars[i] = var
        
        # 分析按钮
        self.analyze_btn = tk.Button(master, text="开始分析", command=self.analyze)
        self.analyze_btn.pack(pady=5)
        
        # 结果输出
        self.result_text = tk.Text(master, height=25, width=80)
        self.result_text.pack(pady=5)
        
        self.current_materials = {}

    def import_data(self):
        json_str = self.text_input.get("1.0", tk.END).strip()
        if not json_str:
            messagebox.showwarning("警告", "请输入JSON数据")
            return
        
        try:
            data = json.loads(json_str)
            if "@type" not in data or data["@type"] != "@penguin-statistics/depot":
                raise ValueError("无效的数据格式")
            
            self.current_materials = {}
            for item in data.get('items', []):
                name = item.get('name')
                if name in material_rank:
                    self.current_materials[name] = item.get('have', 0)
            
            messagebox.showinfo("成功", f"成功导入{len(self.current_materials)}种材料数据！")
        except json.JSONDecodeError:
            messagebox.showerror("错误", "JSON格式不正确")
        except Exception as e:
            messagebox.showerror("错误", f"数据解析失败：{str(e)}")

    def analyze(self):
        # 获取保留设置
        retention = {rank: var.get() for rank, var in self.ret_vars.items()}
        
        # 复制当前库存
        materials = self.current_materials.copy()
        steps = []
        total_cost = 0
        total_mood = 0
        
        # 按等级从低到高处理
        for current_rank in [1, 2, 3, 4]:
            current_mats = [mat for mat in material_rank if material_rank[mat] == current_rank]
            for mat in current_mats:
                # 获取所有需要当前材料的配方
                products = []
                for product in recipes:
                    if mat in recipes[product]['materials']:
                        products.append(product)
                
                # 按产品库存升序排序
                products.sort(key=lambda p: materials.get(p, 0))
                
                for product in products:
                    recipe = recipes[product]
                    required = recipe['materials']
                    
                    # 计算最大可合成次数
                    min_times = None
                    for rm, cnt in required.items():
                        # 获取保留数量
                        rm_rank = material_rank.get(rm, 0)
                        reserve = retention.get(rm_rank, 0) if rm_rank != 0 else 0
                        
                        current = materials.get(rm, 0)
                        available = max(current - reserve, 0)
                        times = available // cnt
                        
                        if times < 0 or (min_times is not None and times < min_times):
                            min_times = times
                        elif min_times is None:
                            min_times = times
                    
                    if min_times is None or min_times <= 0:
                        continue
                    
                    # 执行合成
                    for rm, cnt in required.items():
                        materials[rm] = materials.get(rm, 0) - cnt * min_times
                    materials[product] = materials.get(product, 0) + min_times
                    
                    # 记录步骤
                    cost = recipe['cost'] * min_times
                    mood = recipe['mood'] * min_times
                    steps.append({
                        'product': product,
                        'times': min_times,
                        'materials': required.copy(),
                        'cost': cost,
                        'mood': mood
                    })
                    total_cost += cost
                    total_mood += mood
        
        # 按T2-T5顺序分组输出
        output = []
        grouped = {}
        for step in steps:
            rank = material_rank.get(step['product'], 0)
            if rank >= 2:
                if rank not in grouped:
                    grouped[rank] = []
                grouped[rank].append(step)
        
        # 按等级排序输出
        for rank in sorted(grouped.keys()):
            output.append(f"=== T{rank}材料合成 ===")
            for step in grouped[rank]:
                mats = ", ".join([f"{k}×{v*step['times']}" for k, v in step['materials'].items()])
                output.append(f"合成 {step['product']} ×{step['times']}次")
                output.append(f"消耗材料：{mats}")
                output.append(f"消耗龙门币：{step['cost']} 心情：{step['mood']}\n")
        
        output.append(f"总消耗：龙门币 {total_cost}，心情 {total_mood}")
        
        self.result_text.delete(1.0, tk.END)
        self.result_text.insert(tk.END, "\n".join(output))

if __name__ == "__main__":
    root = tk.Tk()
    app = MaterialSynthesizer(root)
    root.mainloop()
