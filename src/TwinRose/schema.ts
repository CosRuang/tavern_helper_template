export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('6月1日 午后'),
    当前区域: z.enum(['主堡大厅', '宴会厅', '藏书室', '蔷薇花园', '礼拜堂', '马厩与猎场', '琴房', '主卧室区', '大浴室', '厨房与仆役区', '酒窖', '塔楼密室']).prefault('主堡大厅'),
    宴会状态: z.string().prefault('无'),
    事件日志: z.array(z.string()).prefault([]),
    近期目标: z.string().prefault('以完美管家形象站稳脚跟，取得姐弟信任'),
  }),
  伊莲娜: z.object({
    堕落值: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    忠诚度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    淫乱度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    阶段: z.coerce.number().prefault(1).transform(v => _.clamp(v, 1, 6)),
    阶段称号: z.string().prefault('戒备的蔷薇'),
    动态称号: z.array(z.string()).prefault([]),
    着装: z.string().prefault('素色长裙，珍珠项链，领口扣到最上一颗'),
    状态: z.string().prefault('端庄得体，对新管家保持审视'),
    身体部位: z.record(z.enum(['嘴唇', '舌', '耳', '颈', '胸', '乳首', '腰', '背', '腹', '臀', '大腿', '足', '花蕊', '后穴']), z.object({
      开发状态: z.enum(['未开发', '初觉', '适应', '沉溺', '彻底开发']).prefault('未开发'),
      道具: z.string().prefault('无'),
      备注: z.string().prefault(''),
    })).prefault({}),
    穿戴道具: z.array(z.string()).prefault([]),
    性癖: z.array(z.string()).prefault(['端庄失态快感', '权力反转快感']),
  }),
  里克: z.object({
    堕落值: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    忠诚度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    淫乱度: z.coerce.number().prefault(0).transform(v => _.clamp(v, 0, 100)),
    阶段: z.coerce.number().prefault(1).transform(v => _.clamp(v, 1, 6)),
    阶段称号: z.string().prefault('嘴硬的少爷'),
    动态称号: z.array(z.string()).prefault([]),
    着装: z.string().prefault('浅色衬衫配马甲，袖口挽起'),
    状态: z.string().prefault('别扭好奇，眼睛总往管家那边飘，被问起就说「我才没看」'),
    身体部位: z.record(z.enum(['嘴唇', '舌', '耳', '颈', '胸', '乳首', '腰', '背', '腹', '臀', '大腿', '足', '茎身', '后穴']), z.object({
      开发状态: z.enum(['未开发', '初觉', '适应', '沉溺', '彻底开发']).prefault('未开发'),
      道具: z.string().prefault('无'),
      备注: z.string().prefault(''),
    })).prefault({}),
    穿戴道具: z.array(z.string()).prefault([]),
    性癖: z.array(z.string()).prefault(['全身敏感怕痒', '女性衣物的向往']),
  }),
  系统: z.object({
    先堕者: z.enum(['未定', '伊莲娜', '里克']).prefault('未定'),
  }),
});
export type Schema = z.output<typeof Schema>;
