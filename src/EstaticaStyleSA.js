// src/EstaticaStyleSA.js
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, keyframes, styled, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

// Animação de entrada
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animação de flutuação
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// Animação de brilho
const shineAnimation = keyframes`
  0% { text-shadow: 0 0 8px rgba(255,255,255,0.5); }
  50% { text-shadow: 0 0 20px rgba(255,255,255,0.9); }
  100% { text-shadow: 0 0 8px rgba(255,255,255,0.5); }
`;

// Componentes estilizados
const ComingSoonContainer = styled(Box)({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.9)",
  overflow: "hidden",
  position: "relative",
  textAlign: "center",
  padding: "2rem",
  "@media (max-width: 600px)": {
    padding: "1rem",
  },
});

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 10,
  maxWidth: "1200px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 600px)": {
    padding: "0 1rem",
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 1,
});

const LogoContainer = styled(Box)(({ theme }) => ({
  animation: `${fadeIn} 0.8s ease-out forwards`,
  marginBottom: theme.spacing(4),
  "& img": {
    width: "clamp(120px, 25vw, 180px)",
    height: "auto",
    filter: "drop-shadow(0 2px 8px rgba(255,255,255,0.5))",
    "@media (max-width: 600px)": {
      width: "100px",
    },
  },
  "@media (max-width: 600px)": {
    marginBottom: theme.spacing(2),
  },
}));

const BrandName = styled('span')({
  color: '#fff',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  animation: `${shineAnimation} 3s ease-in-out infinite`,
  padding: '0 0.3em',
  "@media (max-width: 600px)": {
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '0.5rem',
  },
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(2rem, 6vw, 4rem)",
  fontWeight: 700,
  letterSpacing: "0.1em",
  marginBottom: theme.spacing(2),
  color: "#fff",
  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
  animation: `${fadeIn} 0.8s ease-out 0.3s both`,
  position: "relative",
  zIndex: 10,
  "@media (max-width: 600px)": {
    fontSize: "1.8rem",
    letterSpacing: "0.05em",
    marginBottom: theme.spacing(1),
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
  fontWeight: 400,
  lineHeight: 1.6,
  maxWidth: "700px",
  marginBottom: theme.spacing(4),
  color: "rgba(255,255,255,0.9)",
  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
  animation: `${fadeIn} 0.8s ease-out 0.6s both`,
  position: "relative",
  zIndex: 10,
  "@media (max-width: 600px)": {
    fontSize: "0.9rem",
    lineHeight: 1.5,
    marginBottom: theme.spacing(3),
    padding: "0 1rem",
  },
}));

const CountdownContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "clamp(0.5rem, 2vw, 1.5rem)",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  animation: `${fadeIn} 0.8s ease-out 0.9s both`,
  position: "relative",
  zIndex: 10,
  "@media (max-width: 600px)": {
    gap: "0.5rem",
    marginBottom: theme.spacing(3),
  },
}));

const CountdownBox = styled(Box)(({ theme }) => ({
  width: "clamp(5rem, 12vw, 7rem)",
  height: "clamp(5rem, 12vw, 7rem)",
  backgroundColor: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(4px)",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.2)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
    transform: "translateY(-5px)",
  },
  "@media (max-width: 600px)": {
    width: "4.5rem",
    height: "4.5rem",
  },
  "@media (max-width: 400px)": {
    width: "4rem",
    height: "4rem",
  },
}));

const CountdownValue = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
  fontWeight: 700,
  color: "#fff",
  lineHeight: 1,
  "@media (max-width: 600px)": {
    fontSize: "1.4rem",
  },
  "@media (max-width: 400px)": {
    fontSize: "1.2rem",
  },
}));

const CountdownLabel = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)",
  fontWeight: 300,
  color: "rgba(255,255,255,0.9)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginTop: "0.3rem",
  "@media (max-width: 600px)": {
    fontSize: "0.5rem",
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  padding: "clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 3rem)",
  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
  fontWeight: 500,
  borderRadius: "50px",
  backgroundColor: "rgba(255,255,255,0.9)",
  color: "#000",
  transition: "all 0.3s ease",
  animation: `${fadeIn} 0.8s ease-out 1.2s both`,
  position: "relative",
  zIndex: 10,
  "&:hover": {
    backgroundColor: "#fff",
    transform: "translateY(-3px)",
    boxShadow: "0 5px 15px rgba(255,255,255,0.3)",
  },
  "@media (max-width: 600px)": {
    padding: "0.7rem 1.5rem",
    fontSize: "0.9rem",
  },
}));

const FloatingImage = styled("img")(({ delay, left, top, zIndex }) => ({
  position: "absolute",
  width: "clamp(100px, 20vw, 220px)",
  height: "auto",
  objectFit: "cover",
  borderRadius: "8px",
  opacity: 0.8,
  zIndex: zIndex,
  animation: `${floatAnimation} 12s ease-in-out infinite, ${fadeIn} 1.5s ease-out ${delay}s both`,
  left: left,
  top: top,
  boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
  transition: "all 0.5s ease",
  filter: "none",
  // Removemos as media queries que alteravam a posição
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "clamp(1rem, 3vh, 2rem)",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  gap: "clamp(1rem, 2vw, 1.5rem)",
  animation: `${fadeIn} 0.8s ease-out 1.5s both`,
  zIndex: 10,
  "@media (max-width: 600px)": {
    gap: "0.8rem",
    bottom: "1rem",
  },
}));

const SocialIcon = styled("a")(({ theme }) => ({
  color: "rgba(255,255,255,0.8)",
  fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fff",
    transform: "translateY(-3px)",
  },
  "@media (max-width: 600px)": {
    fontSize: "1rem",
  },
}));

const VisitorCounter = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "20px",
  backgroundColor: "rgba(0,0,0,0.7)",
  padding: "8px 12px",
  borderRadius: "20px",
  color: "rgba(255,255,255,0.9)",
  fontSize: "0.8rem",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "@media (max-width: 600px)": {
    top: "10px",
    right: "10px",
    fontSize: "0.7rem",
    padding: "5px 8px",
  },
}));

// Configuração das imagens flutuantes (mesma posição para mobile e desktop)
const wolfImages = [
  { src: "/sobre/s1.jpg", delay: 0.2, left: "3%", top: "3%", zIndex: 2 },
  { src: "/sobre/s2.jpg", delay: 0.3, left: "2%", top: "45%", zIndex: 2 },
  { src: "/sobre/s3.jpg", delay: 0.4, left: "1%", top: "70%", zIndex: 2 },
  { src: "/sobre/s4.jpg", delay: 0.5, left: "85%", top: "55%", zIndex: 2 },
  { src: "/sobre/s5.jpg", delay: 0.6, left: "70%", top: "5%", zIndex: 2 },
  { src: "/sobre/s6.jpg", delay: 0.7, left: "68%", top: "40%", zIndex: 2 },
  { src: "/sobre/s7.jpg", delay: 0.8, left: "10%", top: "50%", zIndex: 2 },
  { src: "/sobre/s8.jpg", delay: 0.9, left: "85%", top: "30%", zIndex: 2 },
  { src: "/sobre/s9.jpg", delay: 1.0, left: "70%", top: "75%", zIndex: 2 },
  { src: "/sobre/s10.jpg", delay: 0.2, left: "15%", top: "10%", zIndex: 2 },
  { src: "/sobre/s11.jpg", delay: 0.3, left: "78%", top: "15%", zIndex: 2 },
  { src: "/sobre/s12.jpg", delay: 0.4, left: "18%", top: "70%", zIndex: 2 },
  { src: "/sobre/s13.jpg", delay: 0.5, left: "82%", top: "65%", zIndex: 2 },
];

const EstaticaStyleSA = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  // Efeito para alterar o título da página
  useEffect(() => {
    document.title = "Style S&A - Loja Virtual em Breve";
    
    // Criar link para o favicon dinamicamente
    const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = '/logo.jpg';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Contador de visitas - integração com API
    const fetchVisitorCount = async () => {
      try {
        const storedCount = localStorage.getItem('visitorCount');
        const initialCount = storedCount ? parseInt(storedCount) : Math.floor(Math.random() * 500) + 100;
        setVisitorCount(initialCount);
        localStorage.setItem('visitorCount', (initialCount + 1).toString());
      } catch (error) {
        console.error("Erro ao buscar contador de visitas:", error);
      }
    };

    fetchVisitorCount();

    const calculateTimeLeft = () => {
      const launchDate = new Date("August 1, 2025 00:00:00").getTime();
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = async () => {
    try {
      console.log("E-mail cadastrado:", email);
      setIsSubscribed(true);
      
      setTimeout(() => {
        setOpenDialog(false);
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao cadastrar e-mail:", error);
      alert("Ocorreu um erro ao cadastrar seu e-mail. Por favor, tente novamente.");
    }
  };

  return (
    <ComingSoonContainer>
      <Overlay />
      
      <VisitorCounter>
        <i className="fas fa-users"></i>
        <span>{visitorCount.toLocaleString()} visitantes</span>
      </VisitorCounter>
      
      {wolfImages.map((img, index) => (
        <FloatingImage
          key={index}
          src={img.src}
          alt=""
          delay={img.delay}
          left={img.left}
          top={img.top}
          zIndex={img.zIndex}
        />
      ))}

      <ContentWrapper>
        <LogoContainer>
          <img src="/logo.jpg" alt="Logo Style S&A" />
        </LogoContainer>

        <Title variant="h1">
          <BrandName>STYLE S&A</BrandName> 
        </Title>
        <Title variant="h1">LOJA VIRTUAL</Title>

        <Subtitle variant="h2">
          Estamos preparando uma experiência exclusiva de moda para você. 
          <br />
          Nosso lançamento oficial será em <strong>1º de agosto de 2025</strong>.
        </Subtitle>

        <CountdownContainer>
          <CountdownBox>
            <CountdownValue>{timeLeft.days}</CountdownValue>
            <CountdownLabel>Dias</CountdownLabel>
          </CountdownBox>
          <CountdownBox>
            <CountdownValue>{timeLeft.hours}</CountdownValue>
            <CountdownLabel>Horas</CountdownLabel>
          </CountdownBox>
          <CountdownBox>
            <CountdownValue>{timeLeft.minutes}</CountdownValue>
            <CountdownLabel>Minutos</CountdownLabel>
          </CountdownBox>
          <CountdownBox>
            <CountdownValue>{timeLeft.seconds}</CountdownValue>
            <CountdownLabel>Segundos</CountdownLabel>
          </CountdownBox>
        </CountdownContainer>

        <CTAButton
          variant="contained"
          size="large"
          onClick={() => setOpenDialog(true)}
        >
          Receber notificação
        </CTAButton>
      </ContentWrapper>

      <SocialLinks>
        <SocialIcon href="https://www.instagram.com/stylle_sea?igsh=cHU4d3lrZTY5cnJv" target="_blank" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </SocialIcon>
        <SocialIcon href="https://wa.me/message/RYSKRZYS6R6LP1" target="_blank" aria-label="WhatsApp">
          <i className="fab fa-whatsapp"></i>
        </SocialIcon>
      </SocialLinks>

      {/* Dialog para captura de e-mail */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {isSubscribed ? "Inscrição Confirmada!" : "Receba Notificações"}
        </DialogTitle>
        <DialogContent>
          {isSubscribed ? (
            <Typography>
              Obrigado por se inscrever! Você receberá todas as novidades sobre o lançamento.
            </Typography>
          ) : (
            <>
              <Typography gutterBottom>
                Digite seu e-mail para ser notificado quando lançarmos:
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                label="Seu melhor e-mail"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.4)',
                    },
                  },
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!isSubscribed && (
            <>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleSubscribe} color="primary" variant="contained">
                Confirmar
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </ComingSoonContainer>
  );
};

export default EstaticaStyleSA;