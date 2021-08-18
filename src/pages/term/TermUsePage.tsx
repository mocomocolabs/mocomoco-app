import { IonContent, IonPage } from '@ionic/react'
import { FC, useEffect } from 'react'
import { BackButton } from '../../components/molecules/BackButtonComponent'
import { Header } from '../../components/organisms/HeaderComponent'
import { useStore } from '../../hooks/use-store'

export const TermUsePage: FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsBottomTab(false)
  }, [])

  return (
    <IonPage>
      <Header start={<BackButton type='close' />} center='이용약관' />

      <IonContent>
        <div className='px-container'>
          <p className='p2'>
            제
            <span className='s2'>
              <strong>1</strong>
            </span>
            장 총칙
          </p>
          <p className='p3'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>1</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            목적
            <span className='s3'>
              <strong>) </strong>
            </span>
            이 약관은 모코모코<span className='s3'>(</span>이하<span className='s3'> &ldquo;</span>회사
            <span className='s3'>&rdquo;</span>라 합니다<span className='s3'>)</span>가 모바일 기기를 통해
            제공하는 하마 앱서비스 및 이에 부수하는 네트워크<span className='s3'>, </span>웹사이트
            <span className='s3'>, </span>기타 서비스<span className='s3'>(</span>이하
            <span className='s3'> &ldquo;</span>서비스<span className='s3'>&rdquo;</span>라 합니다
            <span className='s3'>)</span>의 이용에 대한 회사와 서비스 이용자의 권리ㆍ의무 및 책임사항
            <span className='s3'>, </span>기타 필요한 사항을 규정함을 목적으로 합니다
            <span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>2</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            용어의 정의
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;1. &ldquo;</span>회사<span className='s3'>&rdquo;</span>라 함은 모바일
            기기를 통하여 서비스를 제공하는 사업자를 의미합니다<span className='s3'>.</span>
          </p>
          <p className='p6'>
            <span className='s3'>&nbsp;2. &ldquo;</span>회원<span className='s3'>&rdquo;</span>이란 이 약관에
            따라 이용계약을 체결하고<span className='s3'>, </span>회사가 제공하는 서비스를 이용하는 자를
            의미합니다<span className='s3'>.</span>
          </p>
          <p className='p7'>
            <span className='s3'>&nbsp;3. &ldquo;</span>임시회원<span className='s3'>&rdquo;</span>이란 일부
            정보만 제공하고 회사가 제공하는 서비스의 일부만 이용하는 자를 의미합니다
            <span className='s3'>.</span>
          </p>
          <p className='p8'>
            <span className='s3'>&nbsp;4. &ldquo;</span>모바일 기기<span className='s3'>&rdquo;</span>란
            콘텐츠를 다운로드 받거나 설치하여 사용할 수 있는 기기로서<span className='s3'>, </span>휴대폰
            <span className='s3'>, </span>스마트폰<span className='s3'>, </span>휴대정보단말기
            <span className='s3'>(PDA), </span>태블릿 등을 의미합니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p9'>
            <span className='s3'>&nbsp;5. &ldquo;</span>계정정보<span className='s3'>&rdquo;</span>란 회원의
            이메일주소<span className='s3'>, </span>이름<span className='s3'>, </span>별명
            <span className='s3'>, </span>프로필 사진 등 회원이 회사에 제공한 정보를 통칭합니다
            <span className='s3'>.</span>
          </p>
          <p className='p8'>
            <span className='s3'>&nbsp;6. &ldquo;</span>콘텐츠<span className='s3'>&rdquo;</span>란 모바일
            기기로 이용할 수 있도록 회사가 서비스 제공과 관련하여 디지털 방식으로 제작한 유료 또는 무료의
            내용물 일체<span className='s3'>(</span>애플리케이션<span className='s3'>, </span>네트워크 서비스
            등<span className='s3'>)</span>를 의미합니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p10'>
            <span className='s3'>&nbsp;7.&nbsp; &ldquo;</span>애플리케이션<span className='s3'>&rdquo;</span>
            이란 회사가 제공하는 서비스를 이용하기 위하여 모바일 기기를 통해 다운로드 받거나 설치하여 사용하는
            프로그램 일체를 의미합니다<span className='s3'>.</span>
          </p>
          <p className='p7'>
            <span className='s3'>8 . &ldquo;</span>앱서비스<span className='s3'>&rdquo;</span>라 함은 회사가
            제공하는 서비스의 하나로서 회원이 모바일 기기에서 실행하는
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp; </span>
            </span>
            서비스를 의미합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 이 약관에서 사용하는 용어의 정의는 본 조 제<span className='s3'>1</span>항에서 정하는 것을
            제외하고는 관계법령 및 서비스별 정책에서 정하는 바에 의하며<span className='s3'>, </span>이에
            정하지 아니한 것은 일반적인 상 관례에 따릅니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>3</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회사정보 등의 제공
            <span className='s3'>
              <strong>) </strong>
            </span>
            회사는 다음 각 호의 사항을 회원이 알아보기 쉽도록 앱서비스 내에 표시합니다
            <span className='s3'>. </span>다만<span className='s3'>, </span>개인정보처리방침과 약관은 회원이
            연결화면을 통하여 볼 수 있도록 할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;1. </span>상호 및 대표자의 성명
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p11'>
            <span className='s3'>&nbsp;2. </span>영업소 소재지 주소<span className='s3'>(</span>회원의 불만을
            처리할 수 있는 곳의 주소를 포함한다
            <span className='s3'>
              )<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;3. </span>전화번호<span className='s3'>, </span>전자우편주소
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;4. </span>개인정보처리방침
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;5. </span>서비스 이용약관
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>4</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            약관의 효력 및 변경
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 이 약관의 내용을 회원이 알 수 있도록 앱서비스 내 또는 그 연결화면에 게시합니다
            <span className='s3'>. </span>이 경우 이 약관의 내용 중 서비스 중단<span className='s3'>, </span>
            청약철회<span className='s3'>, </span>환급<span className='s3'>, </span>계약 해제
            <span className='s4'>․</span>해지<span className='s3'>, </span>회사의 면책사항 등과 같은 중요한
            내용은 굵은 글씨<span className='s3'>, </span>색채<span className='s3'>, </span>부호 등으로
            명확하게 표시하거나 별도의 연결화면 등을 통하여 회원이 알아보기 쉽게 처리합니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사가 약관을 개정할 경우에는 적용일자 및 개정내용<span className='s3'>, </span>개정사유 등을
            명시하여 최소한 그 적용일<span className='s3'> 7</span>일 이전부터 앱서비스 내 또는 그 연결화면에
            게시하여 회원에게 공지합니다<span className='s3'>. </span>다만<span className='s3'>, </span>변경된
            내용이 회원에게 불리하거나 중대한 사항의 변경인 경우에는 그 적용일<span className='s3'> 30</span>
            일 이전까지 본문과 같은 방법으로 공지하고 제<span className='s3'>27</span>조 제
            <span className='s3'>1</span>항의 방법으로 회원에게 통지합니다<span className='s3'>. </span>이
            경우 개정 전 내용과 개정 후 내용을 명확하게 비교하여 회원이 알기 쉽도록 표시합니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사가 약관을 개정할 경우 개정약관 공지 후 개정약관의 적용에 대한 회원의 동의 여부를 확인합니다
            <span className='s3'>. </span>회사는 제<span className='s3'>2</span>항의 공지 또는 통지를 할 경우
            회원이 개정약관에 대해 동의 또는 거부의 의사표시를 하지 않으면 동의한 것으로 볼 수 있다는 내용도
            함께 공지 또는 통지를 하며<span className='s3'>, </span>회원이 이 약관 시행일까지 거부의
            의사표시를 하지 않는다면 개정약관에 동의한 것으로 볼 수 있습니다<span className='s3'>. </span>
            회원이 개정약관에 대해 동의하지 않는 경우 회사 또는 회원은 서비스 이용계약을 해지할 수 있습니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ④ 회사는 회원이 회사와 이 약관의 내용에 관하여 질의 및 응답을 할 수 있도록 조치를 취합니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑤ 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」<span className='s3'>, </span>「약관의
            규제에 관한 법률」<span className='s3'>, </span>「정보통신망이용촉진 및 정보보호 등에 관한 법률」
            <span className='s3'>, </span>「콘텐츠산업진흥법」 등 관련 법령에 위배하지 않는 범위에서 이 약관을
            개정할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>5</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            이용계약의 체결 및 적용
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 이용계약은 회원이 되고자 하는 자<span className='s3'>(</span>이하
            <span className='s3'> &ldquo;</span>가입신청자<span className='s3'>&rdquo;</span>라 합니다
            <span className='s3'>.)</span>가 이 약관의 내용에 대하여 동의를 한 다음 서비스 이용 신청을 하고
            <span className='s3'>, </span>회사가 그 신청에 대해서 승낙함으로써 체결됩니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ② 회사는 가입신청자의 신청에 대하여 승낙함을 원칙으로 합니다<span className='s3'>. </span>다만
            <span className='s3'>, </span>회사는 다음 각 호의 어느 하나에 해당하는 이용 신청에 대해서는 승낙을
            거절할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p12'>
            <span className='s3'>&nbsp;1. </span>이용신청서 내용을 허위로 기재하거나 이용신청 요건을 충족하지
            못한 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p12'>
            <span className='s3'>&nbsp;2. </span>회사가 서비스를 제공하지 않은 국가에서 비정상적이거나
            우회적인 방법을 통해 서비스를 이용하는 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p12'>
            <span className='s3'>&nbsp;3. </span>앱서비스 관련 법령에서 금지하는 행위를 할 목적으로 신청 하는
            경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p13'>
            <span className='s3'>&nbsp;4. </span>사회의 안녕과 질서 또는 미풍양속을 저해할 목적으로 신청한
            경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;5. </span>부정한 용도로 앱서비스를 이용하고자 하는 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;6. </span>영리를 추구할 목적으로 앱서비스를 이용하고자 하는 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p13'>
            <span className='s3'>&nbsp;7. </span>그 밖에 각 호에 준하는 사유로서 승낙이 부적절하다고 판단되는
            경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ③ 회사는 다음 각 호의 어느 하나에 해당하는 경우 그 사유가 해소될 때까지 승낙을 유보할 수 있습니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p14'>
            <span className='s3'>&nbsp;1. </span>회사의 설비에 여유가 없거나<span className='s3'>, </span>특정
            모바일 기기의 지원이 어렵거나<span className='s3'>, </span>기술적 장애가 있는 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p15'>
            <span className='s3'>&nbsp;2. </span>서비스 상의 장애 또는 서비스 이용요금
            <span className='s3'>, </span>결제수단의 장애가 발생한 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p16'>
            <span className='s3'>&nbsp;3. </span>그 밖의 각 호에 준하는 사유로서 이용신청의 승낙이 어렵다고
            판단되는 경우
          </p>
          <p className='p17'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>6</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            약관 외 준칙
            <span className='s3'>
              <strong>) </strong>
            </span>
            이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 「전자상거래 등에서의 소비자보호에 관한
            법률」<span className='s3'>,</span>「약관의 규제에 관한 법률」<span className='s3'>,</span>
            「정보통신망이용촉진 및 정보보호 등에 관한 법률」<span className='s3'>,</span>「콘텐츠산업진흥법」
            등 관련 법령 또는 상 관례에 따릅니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>7</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            운영정책
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 약관을 적용하기 위하여 필요한 사항과 약관에서 구체적 범위를 정하여 위임한 사항을 앱서비스
            운영정책<span className='s3'>(</span>이하<span className='s3'> &ldquo;</span>운영정책
            <span className='s3'>&rdquo;</span>이라 합니다<span className='s3'>)</span>으로 정할 수 있습니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ② 회사는 운영정책의 내용을 회원이 알 수 있도록 앱서비스 내 또는 그 연결화면에 게시합니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ③ 운영정책을 개정하는 경우에는 제<span className='s3'>4</span>조 제<span className='s3'>2</span>
            항의 절차에 따릅니다<span className='s3'>. </span>다만<span className='s3'>, </span>운영정책
            개정내용이 다음 각 호의 어느 하나에 해당하는 경우에는 제<span className='s3'>2</span>항의 방법으로
            사전에 공지합니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;1. </span>약관에서 구체적으로 범위를 정하여 위임한 사항을 개정하는 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;2. </span>회원의 권리<span className='s3'>&middot;</span>의무와 관련
            없는 사항을 개정하는 경우
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p8'>
            <span className='s3'>&nbsp;3. </span>운영정책의 내용이 약관에서 정한 내용과 근본적으로 다르지 않고
            회원이 예측할 수 있는 범위 내에서 운영정책을 개정하는 경우
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p18'>
            제
            <span className='s2'>
              <strong>2</strong>
            </span>
            장 개인정보 관리
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>8</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            개인정보의 보호 및 사용
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며
            <span className='s3'>, </span>개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의
            개인정보처리방침에 따릅니다<span className='s3'>. </span>다만<span className='s3'>, </span>회사가
            제공하는 서비스 이외의 링크된 서비스에서는 회사의 개인정보처리방침이 적용되지 않습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 서비스의 특성에 따라 회원의 개인정보와 관련이 없는 별명<span className='s4'>‧</span>캐릭터 사진
            <span className='s4'>‧</span>상태정보 등 자신을 소개하는 내용이 공개될 수 있습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사는 관련 법령에 의해 관련 국가기관 등의 요청이 있는 경우를 제외하고는 회원의 개인정보를
            본인의 동의 없이 타인에게 제공하지 않습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ④ 회사는 회원의 귀책사유로 개인정보가 유출되어 발생한 피해에 대하여 책임을 지지 않습니다
            <span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p18'>
            제
            <span className='s2'>
              <strong>3</strong>
            </span>
            장 이용계약 당사자의 의무
          </p>
          <p className='p19'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>9</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회사의 의무
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 관련 법령<span className='s3'>, </span>이 약관에서 정하는 권리의 행사 및 의무의 이행을
            신의에 따라 성실하게 준수합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보<span className='s3'>(</span>신용정보
            포함<span className='s3'>)</span>보호를 위해 보안시스템을 갖추어야 하며 개인정보처리방침을
            공시하고 준수합니다<span className='s3'>. </span>회사는 이 약관 및 개인정보처리방침에서 정한
            경우를 제외하고는 회원의 개인정보가 제<span className='s3'>3</span>자에게 공개 또는 제공되지
            않도록 합니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ③ 회사는 계속적이고 안정적인 서비스의 제공을 위하여 서비스 개선을 하던 중 설비에 장애가 생기거나
            데이터 등이 멸실<span className='s4'>․</span>훼손된 때에는 천재지변<span className='s3'>, </span>
            비상사태<span className='s3'>, </span>현재의 기술로는 해결이 불가능한 장애나 결함 등 부득이한
            사유가 없는 한 지체 없이 이를 수리 또는 복구하도록 최선의 노력을 다합니다
            <span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>10</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회원의 의무
            <span className='s3'>
              <strong>) </strong>
            </span>
            ① 회원은 회사에서 제공하는 서비스의 이용과 관련하여 다음 각 호에 해당하는 행위를 해서는 안 됩니다
            <span className='s3'>.</span>
          </p>
          <p className='p20'>
            <span className='s3'>&nbsp;1. </span>이용신청 또는 회원 정보 변경 시 허위사실을 기재하는 행위
          </p>
          <p className='p21'>
            <span className='s3'>&nbsp;2. </span>회사가 제공하지 않는 서비스나 비정상적인 방법을 통해 사이버
            자산<span className='s3'>(ID </span>등<span className='s3'>)</span>을 매매 또는 증여하거나
            <span className='s3'>, </span>이를 취득하여 이용하는 행위
          </p>
          <p className='p7'>
            <span className='s3'>&nbsp;3. </span>회사의 직원이나 운영자를 가장하거나 타인의 명의를 도용하여
            글을 게시하거나 메일을 발송하는 행위<span className='s3'>, </span>타인으로 가장하거나 타인과의
            관계를 허위로 명시하는 행위
          </p>
          <p className='p6'>
            <span className='s3'>&nbsp;4. </span>다른 회원의<span className='s3'> ID </span>및 비밀번호를
            부정사용하는 행위
          </p>
          <p className='p21'>
            <span className='s3'>&nbsp;5. </span>다른 회원의 개인정보를 무단으로 수집
            <span className='s5'>&sdot;</span>저장<span className='s5'>&sdot;</span>게시 또는 유포하는 행위
          </p>
          <p className='p6'>
            <span className='s3'>&nbsp;6. </span>도박 등 사행행위를 하거나 유도하는 행위
            <span className='s3'>, </span>음란<span className='s5'>&sdot;</span>저속한 정보를 교류
            <span className='s5'>&sdot;</span>게재하거나 음란 사이트를 연결<span className='s3'>(</span>링크
            <span className='s3'>)</span>하는 행위<span className='s3'>, </span>수치심
            <span className='s5'>&sdot;</span>혐오감 또는 공포심을 일으키는 말
            <span className='s5'>&sdot;</span>소리<span className='s5'>&sdot;</span>글
            <span className='s5'>&sdot;</span>그림<span className='s5'>&sdot;</span>사진 또는 영상을 타인에게
            전송 또는 유포하는 행위 등 서비스를 불건전하게 이용하는 행위
          </p>
          <p className='p22'>
            <span className='s3'>&nbsp;7. </span>서비스를 무단으로 영리<span className='s3'>, </span>영업
            <span className='s3'>, </span>광고<span className='s3'>, </span>홍보<span className='s3'>, </span>
            정치활동<span className='s3'>, </span>선거운동 등 본래의 용도 이외의 용도로 이용하는 행위
          </p>
          <p className='p23'>
            <span className='s3'>&nbsp;8. </span>회사의 서비스를 이용하여 얻은 정보를 무단으로 복제
            <span className='s4'>․</span>유통<span className='s4'>․</span>조장하거나 상업적으로 이용하는 행위
            <span className='s3'>, </span>알려지거나 알려지지 않은 버그를 악용하여 서비스를 이용하는 행위
          </p>
          <p className='p23'>
            <span className='s3'>&nbsp;9. </span>타인을 기망하여 이득을 취하는 행위
            <span className='s3'>, </span>회사의 서비스의 이용과 관련하여 타인에게 피해를 입히는 행위
          </p>
          <p className='p24'>
            <span className='s3'>&nbsp;10. </span>회사나 타인의 지적재산권 또는 초상권을 침해하는 행위
            <span className='s3'>, </span>타인의 명예를 훼손하거나 손해를 가하는 행위
          </p>
          <p className='p25'>
            <span className='s3'>&nbsp;11. </span>법령에 의하여 전송 또는 게시가 금지된 정보
            <span className='s3'>(</span>컴퓨터 프로그램<span className='s3'>)</span>나 컴퓨터 소프트웨어
            <span className='s5'>&sdot;</span>하드웨어 또는 전기통신장비의 정상적인 작동을 방해
            <span className='s5'>&sdot;</span>파괴할 목적으로 고안된 바이러스
            <span className='s5'>&sdot;</span>컴퓨터 코드<span className='s5'>&sdot;</span>파일
            <span className='s5'>&sdot;</span>프로그램 등을 고의로 전송<span className='s5'>&sdot;</span>게시
            <span className='s5'>&sdot;</span>유포 또는 사용하는 행위
          </p>
          <p className='p26'>
            <span className='s3'>&nbsp;12. </span>회사로부터 특별한 권리를 부여 받지 않고 애플리케이션을
            변경하거나<span className='s3'>, </span>애플리케이션에 다른 프로그램을 추가
            <span className='s5'>&sdot;</span>삽입하거나<span className='s3'>, </span>서버를 해킹
            <span className='s5'>&sdot;</span>역설계하거나<span className='s3'>, </span>소스 코드나
            애플리케이션 데이터를 유출<span className='s5'>&sdot;</span>변경하거나
            <span className='s3'>, </span>별도의 서버를 구축하거나<span className='s3'>, </span>웹사이트의
            일부분을 임의로 변경<span className='s5'>&sdot;</span>도용하여 회사를 사칭하는 행위
          </p>
          <p className='p27'>
            <span className='s3'>&nbsp;13. </span>그 밖에 관련 법령에 위반되거나 선량한 풍속 기타 사회통념에
            반하는 행위
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ② 회원의 계정 및 모바일 기기에 관한 관리 책임은 회원에게 있으며<span className='s3'>, </span>이를
            타인이 이용하도록 하게 하여서는 안 됩니다<span className='s3'>. </span>모바일 기기의 관리 부실이나
            타인에게 이용을 승낙함으로 인해 발생하는 손해에 대해서 회사는 책임을 지지 않습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사는 다음 각 호의 행위의 구체적인 내용을 정할 수 있으며<span className='s3'>, </span>회원은
            이를 따라야 합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;&nbsp;1. </span>회원의 계정명<span className='s3'>, </span>기타 앱
            내에서 사용하는 명칭
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;&nbsp;2. </span>채팅내용과 방법
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;&nbsp;3. </span>서비스이용 방법
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;&nbsp;4. </span>카카오 등 외부 모바일 플랫폼 제휴 서비스 정책
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p5'>&nbsp;</p>
          <p className='p18'>
            제
            <span className='s2'>
              <strong>4</strong>
            </span>
            장 서비스 이용 및 이용제한
          </p>
          <p className='p19'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>11</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            서비스의 제공
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 제<span className='s3'>5</span>조의 규정에 따라 이용계약이 완료된 회원에게 그 즉시
            서비스를 이용할 수 있도록 합니다<span className='s3'>. </span>다만<span className='s3'>, </span>
            일부 서비스의 경우 회사의 필요에 따라 지정된 일자부터 서비스를 개시할 수 있습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 회원에게 앱서비스를 제공할 때 이 약관에 정하고 있는 서비스를 포함하여 기타 부가적인
            서비스를 함께 제공할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>12</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            서비스의 이용
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 앱서비스는 회사의 영업방침에 따라 정해진 시간 동안 제공합니다<span className='s3'>. </span>
            회사는 앱서비스 제공시간을 애플리케이션 초기화면이나 앱서비스 공지사항에 적절한 방법으로
            안내합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 제<span className='s3'>1</span>항에도 불구하고 회사는 다음 각 호의 경우에는 서비스의 전부 또는
            일부를 일시 정지할 수 있습니다<span className='s3'>. </span>이 경우 회사는 사전에 그 정지의 사유와
            기간을 애플리케이션 초기화면이나 앱서비스 공지사항 등에 공지합니다<span className='s3'>. </span>
            다만<span className='s3'>, </span>사전에 공지할 수 없는 부득이한 사정이 있는 경우 사후에 공지할 수
            있습니다<span className='s3'>.</span>
          </p>
          <p className='p28'>
            <span className='s3'>&nbsp;1. </span>시스템 정기점검<span className='s3'>, </span>서버의 증설 및
            교체<span className='s3'>, </span>네트워크의 불안정 등의 시스템 운영상 필요한 경우
          </p>
          <p className='p29'>
            <span className='s3'>&nbsp;2. </span>정전<span className='s3'>, </span>서비스 설비의 장애
            <span className='s3'>, </span>서비스 이용폭주<span className='s3'>, </span>기간통신사업자의 설비
            보수 또는 점검 등으로 인하여 정상적인 서비스 제공이 불가능한 경우
          </p>
          <p className='p30'>
            <span className='s3'>&nbsp;3. </span>전시<span className='s3'>, </span>사변
            <span className='s3'>, </span>천재지변 또는 이에 준하는 국가비상사태 등 회사가 통제할 수 없는
            상황이 발생한 경우
          </p>
          <p className='p4'>
            ③ 회사는 모바일 기기를 위한 전용 애플리케이션 또는 네트워크를 이용하여 서비스를 제공합니다
            <span className='s3'>. </span>회원은 애플리케이션을 다운로드하여 설치하거나 네트워크를 이용하여
            무료 또는 유료로 서비스를 이용할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ④ 유료 콘텐츠의 경우에는 해당 서비스에 명시된 요금을 지급하여야 이용할 수 있습니다
            <span className='s3'>. </span>네트워크를 통해 애플리케이션을 다운로드하거나 서비스를 이용하는
            경우에는 가입한 이동통신사에서 정한 별도의 요금이 발생할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑤ 다운로드하여 설치한 애플리케이션 또는 네트워크를 통해 이용하는 서비스의 경우에는 모바일 기기
            또는 이동통신사의 특성에 맞도록 제공됩니다<span className='s3'>. </span>모바일 기기의 변경
            <span className='s4'>․</span>번호 변경 또는 해외 로밍의 경우에는 콘텐츠의 전부 또는 일부의 이용이
            불가능할 수 있으며<span className='s3'>, </span>이 경우 회사는 책임을 지지 않습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑥ 다운로드하여 설치한 애플리케이션 또는 네트워크를 통해 이용하는 서비스의 경우에는 백그라운드
            작업이 진행될 수 있습니다<span className='s3'>. </span>이 경우 모바일 기기 또는 이동통신사의
            특성에 맞도록 추가요금이 발생할 수 있으며 이와 관련하여 회사는 책임을 지지 않습니다
            <span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>13</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            서비스의 변경 및 중단
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 원활한 앱서비스 제공을 위해 운영상 또는 기술상의 필요에 따라 서비스를 변경할 수 있으며
            <span className='s3'>, </span>변경 전에 해당 내용을 앱서비스 내에 공지합니다
            <span className='s3'>. </span>다만<span className='s3'>, </span>버그<span className='s4'>․</span>
            오류 등의 수정이나 긴급 업데이트 등 부득이하게 변경할 필요가 있는 경우 또는 중대한 변경에 해당하지
            않는 경우에는 사후에 공지할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 영업양도<span className='s4'>․</span>분할<span className='s4'>․</span>합병 등에 따른
            영업의 폐지<span className='s3'>, </span>경영상의 중대한 사유로 인해 앱서비스를 지속하기 어려운
            경우에는 서비스 전부를 중단할 수 있습니다<span className='s3'>. </span>이 경우 중단일자
            <span className='s3'> 30</span>일 이전까지 중단일자<span className='s4'>․</span>중단사유
            <span className='s4'>․</span>보상조건 등을 애플리케이션 초기화면 또는 그 연결화면을 통해 공지하고
            제<span className='s3'>27</span>조 제<span className='s3'>1</span>항의 방법으로 회원에게
            통지합니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>14</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            정보의 수집 등
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 회원간에 이루어지는 채팅 내용을 저장<span className='s4'>․</span>보관할 수 있으며 이
            정보는 회사만이 보유합니다<span className='s3'>. </span>회사는 회원간의 분쟁 조정
            <span className='s3'>, </span>민원 처리 또는 서비스 이용 질서의 유지를 위한 경우에 한하여
            <span className='s3'>, </span>제<span className='s3'>3</span>자는 법령에 따라 권한이 부여된 경우에
            한하여 이 정보를 열람할 수 있습니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ② 회사 또는 제<span className='s3'>3</span>자가 제<span className='s3'>1</span>항에 따라 채팅
            정보를 열람할 경우 회사는 사전에 열람의 사유 및 범위를 해당 회원에게 고지합니다
            <span className='s3'>. </span>다만<span className='s3'>, </span>제<span className='s3'>10</span>조
            제<span className='s3'>1</span>항에 따른 금지행위의 조사<span className='s4'>․</span>처리
            <span className='s4'>․</span>확인 또는 그 행위로 인한 피해 구제와 관련하여 이 정보를 열람해야 할
            경우에는 사후에 고지할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사는 서비스의 원활하고 안정적인 운영 및 서비스 품질의 개선을 위하여 회원의 개인정보를 제외한
            회원의 모바일 기기 정보<span className='s3'>(</span>설정<span className='s3'>,</span>사양
            <span className='s3'>,</span>운영체제<span className='s3'>, </span>버전 등
            <span className='s3'>)</span>를 수집 <span className='s4'>‧</span> 활용할 수 있습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ④ 회사는 서비스 개선 및 회원 대상 서비스 소개 등을 위한 목적으로 회원에게 추가정보를 요청할 수
            있습니다<span className='s3'>. </span>이 요청에 대해 회원은 승낙하거나 거절할 수 있으며
            <span className='s3'>, </span>회사가 이 요청을 할 경우에는 회원이 이 요청을 거절할 수 있다는 뜻을
            함께 고지합니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>15</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            광고의 제공
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 서비스의 운영과 관련하여 서비스 내에 광고를 게재할 수 있습니다
            <span className='s3'>. </span>또한 수신에 동의한 회원에 한하여 전자우편
            <span className='s3'>, </span>문자서비스<span className='s3'>(LMS/SMS), </span>푸시메시지
            <span className='s3'>(Push Notification) </span>등의 방법으로 광고성 정보를 전송할 수 있습니다
            <span className='s3'>. </span>이 경우 회원은 언제든지 수신을 거절할 수 있으며
            <span className='s3'>, </span>회사는 회원의 수신 거절 시 광고성 정보를 발송하지 아니합니다
            <span className='s3'>
              .&nbsp;<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ② 회사가 제공하는 서비스 중의 배너 또는 링크 등을 통해 타인이 제공하는 광고나 서비스에 연결될 수
            있습니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ③ 제<span className='s3'>2</span>항에 따라 타인이 제공하는 광고나 서비스에 연결될 경우 해당
            영역에서 제공하는 서비스는 회사의 서비스 영역이 아니므로 회사가 신뢰성
            <span className='s3'>, </span>안정성 등을 보장하지 않으며<span className='s3'>, </span>그로 인한
            회원의 손해에 대하여도 회사는 책임을 지지 않습니다<span className='s3'>. </span>다만
            <span className='s3'>, </span>회사가 고의 또는 중과실로 손해의 발생을 용이하게 하거나 손해 방지를
            위한 조치를 취하지 아니한 경우에는 그러하지 아니합니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>16</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            저작권 등의 귀속
            <span className='s3'>
              <strong>) </strong>
            </span>
            ① 회사가 제작한 앱서비스 내의 콘텐츠에 대한 저작권과 기타 지적재산권은 회사에 귀속합니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회원은 회사가 제공하는 앱서비스를 이용하여 얻은 정보 중에서 회사 또는 제공업체에 지적재산권이
            귀속된 정보를 회사 또는 제공업체의 사전 동의 없이 복제<span className='s5'>&sdot;</span>전송 등의
            방법<span className='s3'>(</span>편집<span className='s3'>, </span>공표
            <span className='s3'>, </span>공연<span className='s3'>, </span>배포<span className='s3'>, </span>
            방송<span className='s3'>, 2</span>차적 저작물 작성 등을 포함합니다<span className='s3'>. </span>
            이하 같습니다<span className='s3'>)</span>에 의하여 영리목적으로 이용하거나 타인에게 이용하게
            하여서는 안 됩니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회원은 앱 내에서 보여지거나 앱서비스와 관련하여 회원 또는 다른 이용자가 애플리케이션을 통해
            업로드 또는 전송하는 대화 텍스트를 포함한 커뮤니케이션<span className='s3'>, </span>이미지
            <span className='s3'>, </span>사운드 및 모든 자료 및 정보<span className='s3'>(</span>이하
            <span className='s3'> &ldquo;</span>이용자 콘텐츠<span className='s3'>&rdquo;</span>라 합니다
            <span className='s3'>.)</span>에 대하여 회사가 다음과 같은 방법과 조건으로 이용하는 것을
            허락합니다<span className='s3'>.</span>
          </p>
          <p className='p31'>
            <span className='s3'>1. </span>해당 이용자 콘텐츠를 이용<span className='s3'>, </span>편집 형식의
            변경 및 기타 변형하는 것<span className='s3'>(</span>공표<span className='s3'>, </span>복제
            <span className='s3'>, </span>공연<span className='s3'>, </span>전송<span className='s3'>, </span>
            배포<span className='s3'>, </span>방송<span className='s3'>, 2</span>차적 저작물 작성 등 어떠한
            형태로든 이용 가능하며<span className='s3'>, </span>이용기간과 지역에는 제한이 없음
            <span className='s3'>)</span>
          </p>
          <p className='p32'>
            <span className='s3'>2. </span>이용자 콘텐츠를 제작한 이용자의 사전 동의 없이 거래를 목적으로
            이용자 콘텐츠를 판매<span className='s3'>, </span>대여<span className='s3'>, </span>양도 행위를
            하지 않음
          </p>
          <p className='p4'>
            ④ 앱 내에서 보여지지 않고 앱서비스와 일체화되지 않은 회원의 이용자 콘텐츠
            <span className='s3'>(</span>예컨대<span className='s3'>, </span>아이디어제안 게시판
            <span className='s3'>
              <span className='Apple-converted-space'>&nbsp; </span>
            </span>
            등에서의 게시물<span className='s3'>)</span>에 대하여 회사는 회원의 명시적인 동의가 없이 이용하지
            않으며<span className='s3'>, </span>회원은 언제든지 이러한 이용자 콘텐츠를 삭제할 수 있습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑤ 회사는 회원이 게시하거나 등록하는 서비스 내의 게시물에 대해 제<span className='s3'>10</span>조
            제<span className='s3'>1</span>항에 따른 금지행위에 해당된다고 판단되는 경우에는 사전 통지 없이
            이를 삭제 또는 이동하거나 그 등록을 거절할 수 있습니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ⑥ 회사가 운영하는 게시판 등에 게시된 정보로 인하여 법률상 이익이 침해된 회원은 회사에 해당 정보의
            삭제 또는 반박 내용의 게재를 요청할 수 있습니다<span className='s3'>. </span>이 경우 회사는
            신속하게 필요한 조치를 취하고 이를 신청인에게 통지합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑦ 이 조는 회사가 앱서비스를 운영하는 동안 유효하며<span className='s3'>, </span>회원 탈퇴 후에도
            지속적으로 적용됩니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>17</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회원에 대한 서비스 이용제한
            <span className='s3'>
              <strong>) </strong>
            </span>
            ① 회원은 제<span className='s3'>10</span>조에 따른 회원의 의무를 위반하는 행위를 하여서는 안 되며
            <span className='s3'>, </span>해당 행위를 하는 경우에 회사는 다음 각 호의 구분에 따른 회원의
            서비스 이용제한<span className='s3'>, </span>관련 정보<span className='s3'>(</span>글
            <span className='s3'>, </span>사진<span className='s3'>, </span>영상 등
            <span className='s3'>) </span>삭제 및 기타의 조치를 포함한 이용제한 조치를 할 수 있습니다
            <span className='s3'>. </span>이용제한 조치가 이루어지는 구체적인 사유 및 절차는 제
            <span className='s3'>19</span>조 제<span className='s3'>1</span>항에 따라 정합니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;1. </span>일부 권한 제한<span className='s3'> : </span>일정기간 채팅 등
            일정 권한을 제한
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;2. </span>계정 이용제한<span className='s3'> : </span>일정기간 또는
            영구히 회원 계정의 이용을 제한
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;3. </span>회원 이용제한<span className='s3'> : </span>일정기간 또는
            영구히 회원의 앱서비스 이용을 제한
          </p>
          <p className='p4'>
            ② 제<span className='s3'>1</span>항의 이용제한이 정당한 경우에 회사는 이용제한으로 인하여 회원이
            입은 손해를 배상하지 않습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사는 다음 각 호의 사유에 대한 조사가 완료될 때까지 해당 계정의 서비스 이용을 정지할 수
            있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;1. </span>계정이 해킹 또는 도용당했다는 정당한 신고가 접수된 경우
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;2. </span>불법프로그램 사용자 또는 작업장 등 위법행위자로 의심되는 경우
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;3. </span>그 밖에 각 호에 준하는 사유로 서비스 이용의 잠정조치가 필요한
            경우
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>18</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            이용제한 조치의 사유와 절차
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 제<span className='s3'>18</span>조 제<span className='s3'>1</span>항에 따른 이용제한
            조치의 구체적인 사유 및 절차를 제<span className='s3'>10</span>조 제<span className='s3'>1</span>
            항에 따른 금지행위의 내용<span className='s4'>․</span>정도<span className='s4'>․</span>횟수
            <span className='s4'>․</span>결과 등을 고려하여 운영정책으로 정합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사가 제<span className='s3'>18</span>조 제<span className='s3'>1</span>항에서 정한 이용제한
            조치를 하는 경우에는 다음 각 호의 사항을 회원에게 사전 통지합니다<span className='s3'>. </span>
            다만<span className='s3'>, </span>긴급히 조치할 필요가 있는 경우에는 사후에 통지할 수 있습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;1. </span>이용제한 조치의 사유
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;2. </span>이용제한 조치의 유형 및 기간
          </p>
          <p className='p4'>
            <span className='s3'>&nbsp;3. </span>이용제한 조치에 대한 이의신청 방법
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>19</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            이용제한 조치에 대한 이의신청 절차
            <span className='s3'>
              <strong>) </strong>
            </span>
            ① 회원이 회사의 이용제한 조치에 불복하고자 할 때에는 이 조치의 통지를 받은 날부터
            <span className='s3'> 14</span>일 이내에 불복 이유를 기재한 이의 신청서를 서면
            <span className='s3'>, </span>전자우편 또는 이에 준하는 방법으로 회사에 제출하여야 합니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 제<span className='s3'>1</span>항의 이의신청서를 접수한 날부터
            <span className='s3'> 15</span>일 이내에 불복 이유에 대하여 서면<span className='s3'>, </span>
            전자우편 또는 이에 준하는 방법으로 답변합니다<span className='s3'>. </span>다만
            <span className='s3'>, </span>회사는 이 기간 내에 답변이 어려운 경우에는 그 사유와 처리일정을
            통지합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사는 불복 이유가 타당한 경우에는 이에 따른 조치를 취합니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p18'>
            제
            <span className='s2'>
              <strong>5</strong>
            </span>
            장 이용계약의 해지
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>20</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            계약 해지 등
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회원은 언제든지 서비스 이용을 원하지 않는 경우 회원 탈퇴를 통해 이용계약을 해지할 수 있습니다
            <span className='s3'>. </span>회원탈퇴로 인해 회원이 앱서비스 내에서 보유한 앱이용정보는 회사의
            개인정보처리방침에 준하여 처리됩니다
            <span className='s3'>
              .<span className='Apple-converted-space'>&nbsp;</span>
            </span>
          </p>
          <p className='p4'>
            ② 회사는 회원이 이 약관 및 그에 따른 운영정책<span className='s3'>, </span>서비스 정책에서
            금지하는 행위를 하는 등 본 계약을 유지할 수 없는 중대한 사유가 있는 경우에는 상당한 기간 전에
            최고하고 기간을 정하여 서비스 이용을 중지하거나 이용계약을 해지할 수 있습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 제<span className='s3'>1</span>항 및 제<span className='s3'>2</span>항에 따른 환급 및 손해배상은
            「콘텐츠이용자보호지침」에 따라 처리합니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p18'>
            제
            <span className='s2'>
              <strong>6</strong>
            </span>
            장 손해배상 및 면책조항 등
          </p>
          <p className='p19'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>21</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            손해배상
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사 또는 회원은 본 약관을 위반하여 상대방에게 손해를 입힌 경우에는 그 손해를 배상할 책임이
            있습니다<span className='s3'>. </span>다만<span className='s3'>, </span>고의 또는 과실이 없는
            경우에는 그러하지 아니 합니다
          </p>
          <p className='p4'>
            ② 회사가 개별서비스 제공자와 제휴 계약을 맺고 회원에게 개별서비스를 제공하는 경우에 회원이 이
            개별서비스 이용약관에 동의를 한 뒤 개별서비스 제공자의 고의 또는 과실로 인해 회원에게 손해가
            발생한 경우에 그 손해에 대해서는 개별서비스 제공자가 책임을 집니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>22</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회사의 면책
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스
            제공에 관하여 책임을 지지 않습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 서비스용 설비의 보수<span className='s3'>, </span>교체<span className='s3'>, </span>
            정기점검<span className='s3'>, </span>공사 등 기타 이에 준하는 사유로 발생한 손해에 대하여 책임을
            지지 않습니다<span className='s3'>. </span>다만<span className='s3'>, </span>회사의 고의 또는
            과실에 의한 경우에는 그러하지 아니합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ③ 회사는 회원의 고의 또는 과실로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다
            <span className='s3'>. </span>다만<span className='s3'>, </span>회원에게 부득이하거나 정당한
            사유가 있는 경우에는 그러하지 아니합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ④ 회원이 서비스와 관련하여 게재한 정보나 자료 등의 신뢰성<span className='s3'>, </span>정확성 등에
            대하여 회사는 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑤ 회사는 회원이 다른 회원 또는 타인과 서비스를 매개로 발생한 거래나 분쟁에 대해 개입할 의무가
            없으며<span className='s3'>, </span>이로 인한 손해에 대해 책임을 지지 않습니다
            <span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑥ 회사는 무료로 제공되는 서비스 이용과 관련하여 회원에게 발생한 손해에 대해서는 책임을 지지
            않습니다<span className='s3'>. </span>그러나 회사의 고의 또는 중과실에 의한 경우에는 그러하지
            아니합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑦ 회사는 회원이 서비스를 이용하여 기대하는 이익을 얻지 못하거나 상실한 것에 대하여 책임을 지지
            않습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑧ 회원이 모바일 기기의 변경<span className='s3'>, </span>모바일 기기의 번호 변경
            <span className='s3'>, </span>운영체제<span className='s3'>(OS) </span>버전의 변경
            <span className='s3'>, </span>해외 로밍<span className='s3'>, </span>통신사 변경 등으로 인해
            콘텐츠 전부나 일부의 기능을 이용할 수 없는 경우 회사는 이에 대해 책임을 지지 않습니다
            <span className='s3'>. </span>다만<span className='s3'>, </span>회사의 고의 또는 과실에 의한
            경우에는 그러하지 아니합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ⑨ 회원이 회사가 제공하는 콘텐츠나 계정정보를 삭제한 경우 회사는 이에 대해 책임을 지지 않습니다
            <span className='s3'>. </span>다만<span className='s3'>, </span>회사의 고의 또는 과실에 의한
            경우에는 그러하지 아니합니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>23</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회원에 대한 통지
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            ① 회사가 회원에게 통지를 하는 경우 회원의 전자우편주소<span className='s3'>, </span>전자메모
            <span className='s3'>, </span>앱서비스 내 채팅 등으로 할 수 있습니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 회원 전체에게 통지를 하는 경우<span className='s3'> 7</span>일 이상 앱서비스 내에
            게시하거나 팝업화면 등을 제시함으로써 제<span className='s3'>1</span>항의 통지에 갈음할 수
            있습니다<span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>24</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            재판권 및 준거법
            <span className='s3'>
              <strong>)</strong>{' '}
            </span>
            이 약관은 대한민국 법률에 따라 규율되고 해석됩니다<span className='s3'>. </span>회사와 회원 간에
            발생한 분쟁으로 소송이 제기되는 경우에는 법령에 정한 절차에 따른 법원을 관할 법원으로 합니다
            <span className='s3'>.</span>
          </p>
          <p className='p5'>&nbsp;</p>
          <p className='p4'>
            제
            <span className='s3'>
              <strong>25</strong>
            </span>
            조
            <span className='s3'>
              <strong> (</strong>
            </span>
            회원의 고충처리 및 분쟁해결
            <span className='s3'>
              <strong>)</strong>
            </span>
          </p>
          <p className='p4'>
            ① 회사는 회원의 편의를 고려하여 회원의 의견이나 불만을 제시하는 방법을 앱서비스 내 또는 그
            연결화면에 안내합니다<span className='s3'>. </span>회사는 이러한 회원의 의견이나 불만을 처리하기
            위한 전담인력을 운영합니다<span className='s3'>.</span>
          </p>
          <p className='p4'>
            ② 회사는 회원으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 합리적인 기간
            내에 이를 신속하게 처리합니다<span className='s3'>. </span>다만<span className='s3'>, </span>
            처리에 장기간이 소요되는 경우에는 회원에게 장기간이 소요되는 사유와 처리일정을 앱서비스 내
            공지하거나 제<span className='s3'>27</span>조 제<span className='s3'>1</span>항에 따라 통지합니다
            <span className='s3'>.</span>
          </p>
          <p className='p33'>
            ③ 회사와 회원 간에 분쟁이 발생하여 제<span className='s3'>3</span>의 분쟁조정기관이 조정할 경우
            회사는 이용제한 등 회원에게 조치한 사항을 성실히 증명하고<span className='s3'>, </span>조정기관의
            조정에 따를 수 있습니다<span className='s3'>.</span>
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}
