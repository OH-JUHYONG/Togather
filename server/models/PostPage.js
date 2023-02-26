const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postpageSchema = mongoose.Schema(
  {
    // 공통 부분
    // 글쓴이, 유저
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // middle Category.... ex) 학교 수업, 대회&공모전, 스터디
    m_category: {
      type: String,
    },

    // middle Category의 key값.... ex) 학교 수업(1), 대회&공모전(2), 스터디(3)
    m_category_Num: {
      type: Number,
      default: 1,
    },

    m_hashtag: {
      type: Array,
      default: [],
    },

    // 제목
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
    },

    //모집 인원
    headcount: {
      type: String,
    },

    // 모집 기한
    day: {
      type: String,
    },

    // 진행 방식
    progress: {
      type: String,
      default: 0,
    },

    // 연락 방법
    contact: {
      type: String,
    },

    // 연락 정보
    contactinfo: {
      type: String,
    },

    // 상세 설명
    description: {
      type: String,
    },

    // 지금까지 본 사람
    views: {
      type: Number,
      default: 0,
    },
    //////////////////////////////////////////////////////////////

    // 교육>>학교 수업
    // 수업명 / 분반
    divison: {
      type: String,
      minlength: 5,
    },

    // 교육>>대회&공모전
    // 대회명
    competition: {
      type: String,
    },

    // 교육>>스터디
    // 분야 ex) 어학, 취업, 프로그래밍, 고시/공무원, IT프로젝트, 편입, 자격증, 기타
    field: {
      type: String,
    },

    // 모집 대상 ex) 1학년, 2학년, 3학년 이상...
    target: {
      type: String,
    },
    target_Num: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

// 검색할때 고려할 가중치
postpageSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weight: {
      title: 5, // title을 description보다 5배 정도 중요시 여긴다
      description: 1,
    },
  },
);

const PostPage = mongoose.model('PostPage', postpageSchema);

// 다른 파일에서도 쓸 수 있게 export
module.exports = { PostPage };
