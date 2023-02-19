const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postpageSchema = mongoose.Schema(
  {
    // 글쓴이, 유저
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // middle Category.... ex) 학교 수업, 대회&공모전, 스터디
    m_category: {
      type: String,
    },

    // middle Category의 key값.... ex) 학교 수업, 대회&공모전, 스터디
    m_category_Num: {
      type: Number,
      default: 1,
    },

    // 수업명 / 분반
    divison: {
      type: String,
      minlength: 5,
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
  },
  { timestamps: true },
);

const PostPage = mongoose.model('PostPage', postpageSchema);

// 다른 파일에서도 쓸 수 있게 export
module.exports = { PostPage };
