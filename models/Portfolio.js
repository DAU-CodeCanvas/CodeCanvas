const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // 제목은 반드시 필요합니다.
        trim: true // 공백을 제거합니다.
    },
    htmlContent: {
        type: String,
        required: true // HTML 내용은 반드시 필요합니다.
    },
    type: {
        type: String,
        enum: ['project', 'template', 'tutorial'], // type은 'project', 'article', 'tutorial' 중 하나로 설정합니다.
        required: true
    },
    tags: {
        type: [String], // 태그는 문자열 배열입니다.
        default: [] // 기본값은 빈 배열입니다.
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 작성자 아이디는 User 모델과 참조 관계입니다.
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'restricted'], // 공개 범위는 'public', 'private', 'restricted' 중 하나입니다.
        default: 'public', // 기본값은 'public'으로 설정합니다.
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // 포트폴리오 작성 시점으로 기본값을 설정합니다.
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// updatedAt을 자동으로 갱신하도록 설정
portfolioSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);