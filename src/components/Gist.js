import styled from "styled-components";
import { format, parseISO } from "date-fns";
import CodeIcon from '../icons/codeIcon';
import Fork from '../icons/fork';
import Comment from '../icons/comment';
import Star from '../icons/star';
import File from "../icons/file";

const GistMeta = ({ gist }) => {
    const { files = {}, comments = 0, html_url } = gist;
    const fileLength = Object.keys(files)?.length;

    const getMeta = (icon, count, metaName, link) => (
        <Meta target="_blank" href={link}>
          {icon}
          {count !== '' &&
          <span style={{ marginLeft: 4, marginRight: 4 }}>
            {count}
          </span>}
          {metaName}
        </Meta>
    )

    return (
        <GistMetaContainer>
              {getMeta(<CodeIcon />, fileLength, 'Files', html_url)}  
              {getMeta(<Fork />, '', 'Forks', `${html_url}/forks`)}
              {getMeta(<Comment />, comments, 'Comments', `${html_url}#comments`)}
              {getMeta(<Star />, '', 'Stars', `${html_url}/stargazers`)}
        </GistMetaContainer>
    )
}

const GistFileFooter = ({ files = {} }) => {
    const getFileEle = (file) => {
        const fileData = files[file];
        return (
            <Meta target="_blank" href={fileData?.raw_url}>
                <File />
                <span style={{ marginLeft: 4 }} >{fileData?.filename}</span>
            </Meta>
        )
    }
    return (
        <FooterContainer>
            {Object.keys(files)?.slice(0, 3).map((file) => getFileEle(file))}
        </FooterContainer>
    )
}

const Gist = ({ gist }) => {
    const avatar = gist?.owner?.avatar_url;
    const ownerName = gist?.owner?.login;
    const createAt = format(parseISO(gist.created_at), "dd/MM/yyyy");
    const updatedAt = format(parseISO(gist.updated_at), "dd/MM/yyyy");
    const des = gist?.description;

    return (
        <Row>
            <ImageFlex>
              <ImageContainer>
                <Img src={avatar} alt='User Avatar' />
                <OwnerText href={gist?.owner?.html_url}>{ownerName}</OwnerText>
              </ImageContainer>
              <GistMeta gist={gist} />
            </ImageFlex>
            <DateFlex>
              <Text>Created at: {createAt}</Text>
              <Text>Last Updated: {updatedAt}</Text>
            </DateFlex>
            {des && <span style={{ fontSize: 16,marginBottom: 12 }} >{des}</span>}
            <GistFileFooter files={gist.files} />
        </Row>
    )
}

const Row = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 2rem;
  border-bottom: 0.1px solid #d0d7de;
  width: 55%
`;
const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;
const ImageFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DateFlex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const Text = styled.span`
  font-size: 12px;
  margin-right: 12px;
`
const OwnerText = styled.a`
  color: #0969da;
  text-decoration: none;
`

const GistMetaContainer = styled.div`
  display: flex;
`

const Meta = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #0969da;
  margin-right: 12px;
  font-size: 16px;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`

const FooterContainer = styled.div`
  margin-left: 8px;
  display: flex;
`


export default Gist;
