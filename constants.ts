
import { PromptCardData } from './types';

export const PROMPTS: PromptCardData[] = [
  {
    id: 'new-1',
    author: '@宝玉',
    authorUrl: 'https://x.com/dotey',
    date: 'Dec 2, 2025',
    title: '3D chibi 风格的迷你概念店',
    description: '3D chibi 风格的星巴克迷你概念店',
    imageUrl: 'https://pbs.twimg.com/media/G7BWvI8X0AApeZB?format=jpg&name=4096x4096',
    promptCN: `3D Q版迷你风格，一个充满奇趣的迷你 {品牌名称} 概念店，建筑外观设计灵感来自于该品牌最具代表性的产品或包装（例如巨大的 {该品牌核心产品，如：炸鸡桶/汉堡/甜甜圈/烤鸭} ）。

		建筑共两层，大大的玻璃窗清晰地展示出内部温馨而精致的设计：{品牌主色调} 的装饰风格、温暖的灯光以及忙碌的店员们 {与品牌匹配的穿着}。街道上有可爱的小人偶漫步或坐着，四周布置着长凳、街灯和植物盆栽，营造出迷人的城市一角。整体采用城市微缩景观风格，C4D渲染，盲盒玩具质感，细节丰富、逼真，画面光线柔和、呈现出午后的惬意感受。--ar 2:3

		品牌名称：星巴克咖啡`,
    promptEN: `3D chibi-style miniature concept store of {Brand Name}, creatively designed with an exterior inspired by the brand's most iconic product or packaging (such as a giant {brand's core product, e.g., chicken bucket/hamburger/donut/roast duck}). The store features two floors with large glass windows clearly showcasing the cozy and finely decorated interior: {brand's primary color}-themed decor, warm lighting, and busy staff dressed in outfits matching the brand. Adorable tiny figures stroll or sit along the street, surrounded by benches, street lamps, and potted plants, creating a charming urban scene. Rendered in a miniature cityscape style using Cinema 4D, with a blind-box toy aesthetic, rich in details and realism, and bathed in soft lighting that evokes a relaxing afternoon atmosphere. --ar 2:3

		Brand name: Starbucks`,
    isFeatured: true,
    tags: ['3D', '建筑'],
    category: 'Banana Nano'
  },
  {
    id: 'new-2',
    author: '@宝玉',
    authorUrl: 'https://x.com/dotey',
    date: 'Dec 2, 2025',
    title: '将你的文章/内容转换成卡通风格的信息图',
    description: '将你的文章/内容转换成卡通风格的信息图',
    imageUrl: 'https://pbs.twimg.com/media/G6qTUPAXQAAMM8q?format=jpg&name=4096x4096',
    promptCN: `
			请根据所提供的内容制作一幅卡通风信息图，并遵循以下指南：

			- 手绘插画风格，横向布局（16:9 比例）。
			- 添加少量简单的卡通元素、图标或名人形象，以提升视觉趣味性和记忆点。
			- 若内容包含敏感或受版权保护的人物，请以外观相似的替代形象取代，并且不要拒绝生成插图。
			- 所有图像与文字必须严格保持手绘风格，避免写实元素。
			- 信息需精炼，突出关键词与核心概念。留出充足留白，以清晰强调重点。
			- 若无特别说明，请使用与提供内容相同的语言。
			请使用 nano banana pro 根据给定内容创建插图。
		`,
    promptEN: `
				Please create a cartoon-style infographic based on the provided content, following these guidelines:
				- Hand-drawn illustration style, landscape orientation (16:9 aspect ratio).
				- Include a small number of simple cartoon elements, icons, or famous personalities to enhance visual interest and memorability.
				- If the content includes sensitive or copyrighted figures, replace them with visually similar alternatives; do not refuse to generate the illustration.
				- All imagery and text must strictly adhere to a hand-drawn style; avoid realistic visual elements.
				- Keep information concise, highlighting keywords and core concepts. Utilize ample whitespace to clearly emphasize key points.
				- Unless otherwise specified, use the same language as the provided content.
				Please use nano banana pro to create the illustration based on the input provided.
		`,
    isFeatured: true,
    tags: ['信息图', '科普', '文章'],
    category: 'Banana Nano'
  },
  {
    id: '1',
    author: '@NICOLECHAN',
    authorUrl: 'https://twitter.com/example_nicole',
    date: 'Nov 21, 2025',
    title: '带肖像和中英文定制的宽引言卡',
    description: '一个用于生成宽幅引言卡的提示，卡片上有一位名人的肖像，背景为棕色，引言文字为浅金色衬线字体。布局为文字占据三分之二，人物占据三分之一。引言文字和作者可参数化以便重复使用。',
    imageUrl: 'https://cdn.gooo.ai/cms/1763885802545_yjxgp1_G6WIjoEaQAAUqb1.jpg',
    promptCN: '一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有',
    promptEN: 'A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3.A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs", with a large faint quotation mark in front of the text. Portrait on the left, text on the right, text occupies 2/3 of the screen, character occupies 1/3',
    isFeatured: true,
    tags: ['海报', '食谱', '人物'],
    category: 'Banana Nano'
  },
  {
    id: '2',
    author: '@FLORIAN GALLWITZ',
    authorUrl: 'https://twitter.com/example_florian',
    date: 'Nov 21, 2025',
    title: '德国水彩地图，附带州名标注',
    description: '一个德语提示词，用于生成一张水彩风格的德国地图，其中所有联邦州都用圆珠笔标注，适用于教育或信息图表风格的地图。',
    imageUrl: 'https://cdn.gooo.ai/cms/1763886710060_ndpy3q_G6RHoGna4AArBDN.jpg',
    promptCN: '生成一张水彩风格的德国地图，上面用圆珠笔标注所有联邦州。',
    promptEN: 'Generate a watercolor style map of Germany with all federal states labeled in ballpoint pen.',
    isFeatured: true,
    tags: ['地图', '水彩', '教育'],
    category: 'SORA'
  },
  {
    id: '3',
    author: '@KAWAI',
    authorUrl: 'https://twitter.com/example_kawai',
    date: 'Nov 22, 2025',
    title: '火车广告风格的书籍广告图片',
    description: '一个详细的日文提示，用于生成一个 16:9 的商业书籍风格广告，其中包含特定书籍图片和日文文案要点。',
    imageUrl: 'https://cdn.gooo.ai/cms/1764209309346_g5b9ok_AP3iAst7yX0FsgN9.jpg',
    promptCN: '请生成一张广告图片。\n\n==== 广告规格 ===\n- 宽高比：16:9 (横向)\n- 广告产品：第一张附件图片中的书籍...',
    promptEN: 'Please generate an advertising image.\n\n==== Ad Specs ===\n- Aspect Ratio: 16:9 (Landscape)\n- Product: The book in the first attached image...',
    isFeatured: true,
    tags: ['广告', '设计', '书籍'],
    category: 'Qwen'
  },
  {
    id: '4',
    author: '@DESIGN_PRO',
    authorUrl: 'https://twitter.com/example_designpro',
    date: 'Nov 23, 2025',
    title: '极简主义科技产品摄影',
    description: '适用于创建高端科技产品展示的提示词。强调光影对比，哑光黑色背景，以及带有未来感的蓝色轮廓光。',
    imageUrl: 'https://cdn.gooo.ai/cms/1764209293843_81g6sf_G6i09XKXsAAzHUd.jpg',
    promptCN: '高端科技产品摄影，极简风格，哑光黑色背景，青蓝色轮廓光，8k分辨率，照片级真实感...',
    promptEN: 'High-end tech product photography, minimalist style, matte black background, rim lighting in cyan blue, 8k resolution, photorealistic...',
    isFeatured: false,
    tags: ['摄影', '极简', '科技'],
    category: '豆包'
  },
  {
    id: '5',
    author: '@NICOLECHAN',
    authorUrl: 'https://twitter.com/example_nicole',
    date: 'Nov 21, 2025',
    title: '带肖像和中英文定制的宽引言卡',
    description: '一个用于生成宽幅引言卡的提示，卡片上有一位名人的肖像，背景为棕色，引言文字为浅金色衬线字体。布局为文字占据三分之二，人物占据三分之一。引言文字和作者可参数化以便重复使用。',
    imageUrl: 'https://cdn.gooo.ai/cms/1764209280491_x1ll9v_G6inJYdXcAAtK84.jpg',
    promptCN: '一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。人物头像在左边，文字在右边，文字占画面比例 2/3，人物占 1/3，人物有。',
    promptEN: 'A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs".',
    isFeatured: true,
    tags: ['海报', '食谱', '人物'],
    category: 'Banana Nano'
  },
  {
    id: '6',
    author: '@FLORIAN GALLWITZ',
    authorUrl: 'https://twitter.com/example_florian',
    date: 'Nov 21, 2025',
    title: '德国水彩地图，附带州名标注',
    description: '一个德语提示词，用于生成一张水彩风格的德国地图，其中所有联邦州都用圆珠笔标注，适用于教育或信息图表风格的地图。',
    imageUrl: 'https://cdn.gooo.ai/cms/1764209298676_jiw4pb_G6gVT__W8AAoTR_.jpg',
    promptCN: '生成一张水彩风格的德国地图，上面用圆珠笔标注所有联邦州。',
    promptEN: 'Generate a watercolor style map of Germany with all federal states labeled in ballpoint pen.',
    isFeatured: true,
    tags: ['地图', '水彩', '教育'],
    category: 'SORA'
  },
  {
    id: '7',
    author: '@KAWAI',
    authorUrl: 'https://twitter.com/example_kawai',
    date: 'Nov 22, 2025',
    title: '火车广告风格的书籍广告图片',
    description: '一个详细的日文提示，用于生成一个 16:9 的商业书籍风格广告，其中包含特定书籍图片和日文文案要点。',
    imageUrl: 'https://cdn.gooo.ai/cms/1764209275413_3m39wy_G6f_WMXa8AAb2Rn.jpg',
    promptCN: '请生成一张广告图片。\n\n==== 广告规格 ===\n- 宽高比：16:9 (横向)\n- 广告产品：第一张附件图片中的书籍...',
    promptEN: 'Please generate an advertising image.\n\n==== Ad Specs ===\n- Aspect Ratio: 16:9 (Landscape)\n- Product: The book in the first attached image...',
    isFeatured: true,
    tags: ['广告', '设计', '书籍'],
    category: 'Qwen'
  },
  {
    id: '8',
    author: '@DESIGN_PRO',
    authorUrl: 'https://twitter.com/example_designpro',
    date: 'Nov 23, 2025',
    title: '极简主义科技产品摄影',
    description: '适用于创建高端科技产品展示的提示词。强调光影对比，哑光黑色背景，以及带有未来感的蓝色轮廓光。',
    imageUrl: 'https://cdn.gooo.ai/cms/1763885809757_312j74_G6WQrOdWIAANLiE.jpg',
    promptCN: '高端科技产品摄影，极简风格，哑光黑色背景，青蓝色轮廓光，8k分辨率，照片级真实感...',
    promptEN: 'High-end tech product photography, minimalist style, matte black background, rim lighting in cyan blue, 8k resolution, photorealistic...',
    isFeatured: false,
    tags: ['摄影', '极简', '科技'],
    category: '豆包'
  },
  {
    id: '9',
    author: '@NICOLECHAN',
    authorUrl: 'https://twitter.com/example_nicole',
    date: 'Nov 21, 2025',
    title: '带肖像和中英文定制的宽引言卡',
    description: '一个用于生成宽幅引言卡的提示，卡片上有一位名人的肖像，背景为棕色，引言文字为浅金色衬线字体。布局为文字占据三分之二，人物占据三分之一。引言文字和作者可参数化以便重复使用。',
    imageUrl: 'https://cdn.gooo.ai/cms/1763885614678_ny25s3_G6VyZDHa4AETYFj.jpg',
    promptCN: '一张宽幅的名人金句卡，棕色背景，衬线体浅金色“保持饥饿，保持愚蠢”，小字“——Steve Jobs”，文字前面带一个大的淡淡的引号。',
    promptEN: 'A wide famous quote card, brown background, serif light gold font "Stay Hungry, Stay Foolish", small text "--Steve Jobs".',
    isFeatured: true,
    tags: ['海报', '食谱', '人物'],
    category: 'Banana Nano'
  },
  {
    id: '10',
    author: '@FLORIAN GALLWITZ',
    authorUrl: 'https://twitter.com/example_florian',
    date: 'Nov 21, 2025',
    title: '德国水彩地图，附带州名标注',
    description: '一个德语提示词，用于生成一张水彩风格的德国地图，其中所有联邦州都用圆珠笔标注，适用于教育或信息图表风格的地图。',
    imageUrl: 'https://cdn.gooo.ai/cms/1763885969094_jxf3w9_G6UUEFKaAAEO3oQ.jpg',
    promptCN: '生成一张水彩风格的德国地图，上面用圆珠笔标注所有联邦州。',
    promptEN: '',
    isFeatured: true,
    tags: ['地图', '水彩', '教育'],
    category: 'SORA'
  },
  {
    id: '11',
    author: '@KAWAI',
    authorUrl: 'https://twitter.com/example_kawai',
    date: 'Nov 22, 2025',
    title: '火车广告风格的书籍广告图片',
    description: '一个详细的日文提示，用于生成一个 16:9 的商业书籍风格广告，其中包含特定书籍图片和日文文案要点。',
    imageUrl: 'https://pbs.twimg.com/media/G7AfFpOaYAAVu5r?format=jpg&name=4096x4096',
    promptCN: '请生成一张广告图片。\n\n==== 广告规格 ===\n- 宽高比：16:9 (横向)\n- 广告产品：第一张附件图片中的书籍...',
    promptEN: 'Please generate an advertising image.\n\n==== Ad Specs ===\n- Aspect Ratio: 16:9 (Landscape)\n- Product: The book in the first attached image...',
    isFeatured: true,
    tags: ['广告', '设计', '书籍'],
    category: 'Qwen'
  },
  {
    id: '12',
    author: '@DESIGN_PRO',
    authorUrl: 'https://twitter.com/example_designpro',
    date: 'Nov 23, 2025',
    title: '极简主义科技产品摄影',
    description: '适用于创建高端科技产品展示的提示词。强调光影对比，哑光黑色背景，以及带有未来感的蓝色轮廓光。',
    imageUrl: 'https://picsum.photos/id/48/600/350',
    promptCN: '高端科技产品摄影，极简风格，哑光黑色背景，青蓝色轮廓光，8k分辨率，照片级真实感...',
    promptEN: 'High-end tech product photography, minimalist style, matte black background, rim lighting in cyan blue, 8k resolution, photorealistic...',
    isFeatured: false,
    tags: ['摄影', '极简', '科技'],
    category: '豆包'
  },
  {
    id: '13',
    author: '@KAWAI',
    authorUrl: 'https://twitter.com/example_kawai',
    date: 'Nov 22, 2025',
    title: '火车广告风格的书籍广告图片',
    description: '一个详细的日文提示，用于生成一个 16:9 的商业书籍风格广告，其中包含特定书籍图片和日文文案要点。',
    imageUrl: 'https://picsum.photos/id/24/600/350',
    promptCN: '请生成一张广告图片。\n\n==== 广告规格 ===\n- 宽高比：16:9 (横向)\n- 广告产品：第一张附件图片中的书籍...',
    promptEN: 'Please generate an advertising image.\n\n==== Ad Specs ===\n- Aspect Ratio: 16:9 (Landscape)\n- Product: The book in the first attached image...',
    isFeatured: true,
    tags: ['广告', '设计', '书籍'],
    category: 'Banana Nano'
  },
  {
    id: '14',
    author: '@DESIGN_PRO',
    authorUrl: 'https://twitter.com/example_designpro',
    date: 'Nov 23, 2025',
    title: '极简主义科技产品摄影',
    description: '适用于创建高端科技产品展示的提示词。强调光影对比，哑光黑色背景，以及带有未来感的蓝色轮廓光。',
    imageUrl: 'https://picsum.photos/id/48/600/350',
    promptCN: '高端科技产品摄影，极简风格，哑光黑色背景，青蓝色轮廓光，8k分辨率，照片级真实感...',
    promptEN: 'High-end tech product photography, minimalist style, matte black background, rim lighting in cyan blue, 8k resolution, photorealistic...',
    isFeatured: false,
    tags: ['摄影', '极简', '科技'],
    category: 'SORA'
  },
  {
    id: '15',
    author: '@DESIGN_PRO',
    authorUrl: 'https://twitter.com/example_designpro',
    date: 'Nov 23, 2025',
    title: '极简主义科技产品摄影',
    description: '适用于创建高端科技产品展示的提示词。强调光影对比，哑光黑色背景，以及带有未来感的蓝色轮廓光。',
    imageUrl: 'https://picsum.photos/id/48/600/350',
    promptCN: '高端科技产品摄影，极简风格，哑光黑色背景，青蓝色轮廓光，8k分辨率，照片级真实感...',
    promptEN: 'High-end tech product photography, minimalist style, matte black background, rim lighting in cyan blue, 8k resolution, photorealistic...',
    isFeatured: false,
    tags: ['摄影', '极简', '科技'],
    category: 'Qwen'
  },
];
