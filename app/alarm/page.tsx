'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Alarm.module.css';

interface AuthData {
  id: number;
  code: string;
  name: string;
}

export default function AlarmPage() {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [message, setMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // localStorage에서 authData 읽어오기
    const stored = localStorage.getItem('authData');
    if (stored) {
      setAuthData(JSON.parse(stored));
    }
  }, []);

  const handleSave = async () => {
    if (!authData) return;
    // 예시: messages 테이블에 auth_id(외래키)와 message를 저장
    const { data, error } = await supabase
      .from('messages')
      .insert([{ auth_id: authData.id, message }]);

    if (error) {
      console.error('메시지 저장 오류:', error);
      setSaveStatus('저장 실패');
    } else {
      setSaveStatus('저장 성공');
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      {/* 오른쪽 상단 혹은 구석에 로그인한 사용자의 이름 표시 */}
      <div className={styles.greeting}>
        {authData ? `${authData.name}님 안녕하세요` : '환영합니다!'}
      </div>
      <div className={styles.content}>
        <h1>Alarm 페이지에 오신 것을 환영합니다!</h1>
        <div className={styles.inputContainer}>
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메모를 입력하세요"
            className={styles.input}
          />
          <button onClick={handleSave} className={styles.button}>
            저장
          </button>
          {saveStatus && <p>{saveStatus}</p>}
        </div>
      </div>
    </div>
  );
}
