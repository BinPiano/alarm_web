'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // auth_codes 테이블에서 해당 code와 일치하는 row 조회 (id, code, name)
    const { data, error } = await supabase
      .from('auth_codes')
      .select('id, code, name')
      .eq('code', code)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      alert('서버 오류가 발생했습니다.');
      return;
    }

    if (data) {
      // 조회한 row를 localStorage에 저장 (나중에 alarm 페이지에서 사용)
      localStorage.setItem('authData', JSON.stringify(data));
      router.push('/alarm');
    } else {
      alert('코드가 일치하지 않습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>아름다운 빈 피아노 학원</span>
        </h1>
        {/* 개인코드 입력 영역 */}
        <div className={styles.authContainer}>
          <label htmlFor="code" className={styles.label}>
            개인코드:
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.button}>
            로그인
          </button>
        </div>
        {/* 블로그 링크를 아래쪽에 배치 */}
        <p className={styles.description}>
          블로그:{' '}
          <a
            href="https://blog.naver.com/bin_piano"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            https://blog.naver.com/bin_piano
          </a>
        </p>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 아름다운 bin piano</p>
      </footer>
    </div>
  );
}
