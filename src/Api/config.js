// cnode接口
const cnodeHost = 'https://cnodejs.org/api/v1';
// 请阅读接口文档 https://cnodejs.org/api
const apiConfigs = {
  getTopics: { // 主题首页
    path: '/topics',
    type: 'get',
    host: cnodeHost,
  },
  getTopicDetail: { // 主题详情
    path: '/topic',
    type: 'get',
    host: cnodeHost,
  },
  createTopic: { // 新建主题
    path: '/topics',
    type: 'post',
    host: cnodeHost,
  },
  updateTopic: { // 编辑主题
    path: '/topics',
    type: 'post',
    host: cnodeHost,
  },
  collectTopic: { // 收藏主题
    path: '/topic_collect/collect',
    type: 'post',
    host: cnodeHost,
  },
  delCollectTopic: { // 取消收藏主题
    path: '/topic_collect/de_collect',
    type: 'post',
    host: cnodeHost,
  },
  getUserCollectTopics: { // 用户所收藏的主题
    path: '/topic_collect',
    type: 'get',
    host: cnodeHost,
  },
  createReply: { // 新建评论
    path: '/topic', // /topic/:topic_id/replies
    type: 'post',
    host: cnodeHost,
  },
  upsReply: { // 为评论点赞
    path: '/reply', // /reply/:reply_id/ups
    type: 'post',
    host: cnodeHost,
  },
  getUserDetail: { // 用户详情
    path: '/user', // /user/:loginname
    type: 'get',
    host: cnodeHost,
  },
  accesstoken: { // 验证 accessToken 的正确性
    path: '/accesstoken',
    type: 'post',
    host: cnodeHost,
  },
  getMessageCount: { // 获取未读消息数
    path: '/message/count',
    type: 'get',
    host: cnodeHost,
  },
  getMessages: { // 获取已读和未读消息
    path: '/messages',
    type: 'get',
    host: cnodeHost,
  },
  messageMarkAll: { // 标记全部已读
    path: '/message/mark_all',
    type: 'post',
    host: cnodeHost,
  },
  messageMarkOne: { // 标记单个消息为已读
    path: '/message/mark_one', // /message/mark_one/:msg_id
    type: 'post',
    host: cnodeHost,
  }
};

export default apiConfigs;
