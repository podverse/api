import { Phase4PodcastLiveItem } from "podcast-partytime/dist/parser/phase/phase-4"
import { PhasePendingChat } from "podcast-partytime/dist/parser/phase/phase-pending"

interface ExtendedPhase4PodcastLiveItem extends Omit<Phase4PodcastLiveItem, 'chat'> {
  chat?: ExtendedChat
  image?: string
}

interface ExtendedChat extends Omit<PhasePendingChat, 'phase' | 'protocol'> {
  phase?: 'pending' | '4'
  protocol?: string
  url?: string
}

export const liveItemCompat = (liveItem: ExtendedPhase4PodcastLiveItem) => {
  const getChatEmbedUrlValue = (chat?: ExtendedChat) => {
    if (chat?.phase === 'pending' && chat.embedUrl) {
      return chat.embedUrl
    }
    // deprecated embed value
    else if (chat?.phase === '4' && chat.url) {
      return chat.url
    }
    return ''
  }

  return {
    alternateEnclosures: liveItem.alternativeEnclosures ?? [],
    author: [liveItem.author],
    // this is chatIRCURL in Podverse schema...probably a bad name since it could be any url :[
    chat: getChatEmbedUrlValue(liveItem.chat),
    chapters: null,
    contentLinks: liveItem.contentLinks ?? [],
    description: liveItem.description,
    duration: 0,
    enclosure: liveItem.enclosure,
    explicit: false, // liveItem.explicit,
    guid: liveItem.guid,
    imageURL: liveItem.image,
    link: liveItem.link,
    liveItemEnd: liveItem.end,
    liveItemStart: liveItem.start,
    liveItemStatus: liveItem.status?.toLowerCase(),
    pubdate: null,
    socialInteraction: [],
    soundbite: [],
    subtitle: '', // liveItem.subtitle,
    summary: '', // liveItem.summary,
    title: liveItem.title,
    transcript: []
  }
}