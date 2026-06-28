import { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    sender: '',
    phone: '',
    email: '',
    title: '',
    content: '1. 강의 일자:\n2. 강의 시간:\n3. 강의 장소:\n4. 교육 대상 및 예상 인원:\n5. 기타 요청사항:\n'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 폼서브밋(FormSubmit) 무료 API를 사용하여 스팸 로그인 화면이나 이메일 클라이언트가 뜨지 않게 백그라운드로 전송
      await fetch("https://formsubmit.co/ajax/spss88512@naver.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[강의 문의] ${formData.title}`,
          "소속 및 담당자": formData.sender,
          "연락처(휴대폰)": formData.phone,
          "이메일": formData.email,
          "문의 내용": formData.content,
          _captcha: "false"
        })
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content success-message" onClick={e => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h3>문의가 접수되었습니다.</h3>
          <p>확인 후 연락드리겠습니다.</p>
          <button className="submit-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>교육 문의하기</h2>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>1. 소속 기관 및 담당자 성함 <span className="required">*</span></label>
            <input 
              type="text" 
              name="sender" 
              required 
              placeholder="예시: OO도서관 홍길동" 
              value={formData.sender} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>2. 휴대폰 번호 <span className="required">*</span></label>
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="예시: 010-0000-0000" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>3. 이메일 <span className="required">*</span></label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="예시: email@example.com" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>4. 강의 문의 제목 <span className="required">*</span></label>
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="예시: 생성형 AI 강의 요청드립니다." 
              value={formData.title} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label>5. 강의 문의 내용 <span className="required">*</span></label>
            <textarea 
              name="content" 
              required 
              rows="7" 
              value={formData.content} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "제출 중..." : "제출하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
